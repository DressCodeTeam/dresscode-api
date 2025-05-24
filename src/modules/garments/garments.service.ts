import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Garment } from './entities/garment.entity';
import { Repository } from 'typeorm';
import { GarmentResponseDto } from './dto/garment-response.dto';
import { CategoriesService } from '../categories/categories.service';
import { AiService, ImageAnalysisResult } from '../ai/ai.service';

type CreateGarmentResponse = {
  create_garment: {
    success: boolean;
    content: GarmentResponseDto;
  };
}[];

type GetUserGarmentResponse = {
  get_user_garment: {
    success: boolean;
    content: GarmentResponseDto[];
  };
}[];

@Injectable()
export class GarmentsService {
  constructor(
    @InjectRepository(Garment)
    private readonly garmentRepository: Repository<Garment>,
    private readonly categoriesService: CategoriesService,
    private readonly aiService: AiService,
  ) {}

  async create(userId: string, imageUrl: string): Promise<GarmentResponseDto> {
    try {
      // Fetch the subcategory details
      const subcategories = (await this.categoriesService.findAll()).flatMap(
        (category) => category.subcategories,
      );

      Logger.log(
        `Subcategories fetched for garment creation: ${JSON.stringify(subcategories)}`,
      );
      Logger.log(`Image URL: ${imageUrl}`);

      const imageAnalysis: ImageAnalysisResult =
        await this.aiService.analyzeImage({
          image_url: imageUrl,
          subcategories: subcategories,
        });

      if (imageAnalysis.subcategory_id === null) {
        throw new InternalServerErrorException('Image analysis failed');
      }

      const queryResult = (await this.garmentRepository.query(
        `SELECT create_garment($1, $2, $3, $4)`,
        [
          userId,
          imageUrl,
          imageAnalysis.subcategory_id,
          imageAnalysis.description,
        ],
      )) as CreateGarmentResponse;

      // Extract the response from the query result
      const response = queryResult[0]?.create_garment;

      // Check if the response indicates success
      if (!response?.success) {
        throw new InternalServerErrorException(
          response?.content || 'Failed to create garment',
        );
      }

      // Return the created garment details
      return response.content;
    } catch (error) {
      throw new InternalServerErrorException(`Error creating garment ${error}`);
    }
  }

  async findAll(userId: string): Promise<GarmentResponseDto[]> {
    try {
      const queryResult = (await this.garmentRepository.query(
        `SELECT get_user_garment($1)`,
        [userId],
      )) as GetUserGarmentResponse;

      // Extract the response from the query result
      const response = queryResult[0]?.get_user_garment;

      // Check if the response indicates success
      if (!response?.success) {
        throw new InternalServerErrorException(
          response?.content || 'Failed to fetch user garments',
        );
      }

      // Return the content (list of garments)
      return response.content;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching user garments: ${error})`,
      );
    }
  }
}
