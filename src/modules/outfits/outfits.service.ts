import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOutfitDto } from './dto/create-outfit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Outfit } from './entities/outfit.entity';
import { Repository } from 'typeorm';
import { OutfitResponseDto } from './dto/outfit-response.dto';
import { GarmentSummaryDto } from '../garments/dto/garment-response.dto';
import { GarmentsService } from '../garments/garments.service';
import { AiService, OutfitResult } from '../ai/ai.service';

type CreateOutfitResponse = {
  create_outfit: {
    success: boolean;
    content: OutfitResponseDto;
  };
}[];
type GetUserOutfitResponse = {
  get_user_outfit: {
    success: boolean;
    content: OutfitResponseDto[];
  };
}[];

type GetOutfitGarmentResponse = {
  get_outfit_garment: {
    success: boolean;
    content: GarmentSummaryDto[];
  };
}[];

@Injectable()
export class OutfitsService {
  constructor(
    @InjectRepository(Outfit)
    private readonly outfitRepository: Repository<Outfit>,
    private readonly aiService: AiService, // Assuming you have an AI service for outfit generation
    private readonly garmentsService: GarmentsService, // Assuming you have a service for garment management
  ) {}

  async create(
    userId: string,
    createOutfitDto: CreateOutfitDto,
  ): Promise<OutfitResponseDto> {
    const { garment_ids, style_id } = createOutfitDto;

    try {
      const queryResult = (await this.outfitRepository.query(
        `SELECT create_outfit($1, $2, $3)`,
        [userId, garment_ids, style_id],
      )) as CreateOutfitResponse;

      // Extract the response from the query result
      const response = queryResult[0]?.create_outfit;

      // Check if the response indicates success
      if (!response?.success) {
        throw new InternalServerErrorException(
          response?.content || 'Failed to create outfit',
        );
      }

      // Return the created outfit details
      return response.content;
    } catch (error) {
      throw new InternalServerErrorException(`Error creating outfit ${error}`);
    }
  }

  async findAll(userId: string): Promise<OutfitResponseDto[]> {
    try {
      const queryResult = (await this.outfitRepository.query(
        `SELECT get_user_outfit($1)`,
        [userId],
      )) as GetUserOutfitResponse;

      // Extract the response from the query result
      const response = queryResult[0]?.get_user_outfit;

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
        `Error fetching user garments ${error}`,
      );
    }
  }

  async findOne(outfitId: number): Promise<GarmentSummaryDto[]> {
    try {
      const queryResult = (await this.outfitRepository.query(
        `SELECT get_outfit_garment($1)`,
        [outfitId],
      )) as GetOutfitGarmentResponse;

      // Extract the response from the query result
      const response = queryResult[0]?.get_outfit_garment;

      // Check if the response indicates success
      if (!response?.success) {
        throw new InternalServerErrorException(
          response?.content || 'Failed to fetch outfit garments',
        );
      }

      // Return the content (list of garments)
      return response.content;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching outfit garments ${error}`,
      );
    }
  }

  async generateOutfits(
    userId: string,
    nb_outfits: number,
    style: string,
    weather: string,
  ): Promise<OutfitResult[]> {
    const user_garments = (await this.garmentsService.findAll(userId)).map(
      (g) => ({
        garment_id: g.id,
        subcategory: g.subcategory,
        description: g.description ?? 'No description provided',
      }),
    );

    const outfits = await this.aiService.generateOutfits({
      garments: user_garments,
      nb_outfits,
      sex: 'male', // TODO: Replace with actual user's gender via get gender
      style,
      weather,
    });

    return outfits;
  }
}
