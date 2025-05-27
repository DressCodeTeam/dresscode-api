import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateOutfitDto } from './dto/create-outfit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Outfit } from './entities/outfit.entity';
import { Repository } from 'typeorm';
import { OutfitResponseDto } from './dto/outfit-response.dto';
import {
  GarmentResponseDto,
  GarmentSummaryDto,
} from '../garments/dto/garment-response.dto';
import { GarmentsService } from '../garments/garments.service';
import { AiService } from '../ai/ai.service';
import { UsersService } from '../users/users.service';
import { StylesService } from '../styles/styles.service';
import { GenerateOutfitsResponseDto } from './dto/generate-outfits.dto';

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
    private readonly styleService: StylesService,
    private readonly aiService: AiService,
    private readonly garmentsService: GarmentsService,
    private readonly usersService: UsersService,
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
    style_id: number,
    weather: string,
  ): Promise<GenerateOutfitsResponseDto[]> {
    const full_user_garments = await this.garmentsService.findAll(userId);
    const user_garments = full_user_garments.map((g) => ({
      garment_id: g.id,
      subcategory: g.subcategory,
      description: g.description ?? 'No description provided',
    }));

    const userProfile = await this.usersService.getProfile(userId);

    const style = (await this.styleService.findAll()).find(
      (obj) => obj.id === style_id,
    );

    if (!style) {
      throw new BadRequestException('Error style not found');
    }

    const generated_outfits = await this.aiService.generateOutfits({
      garments: user_garments,
      nb_outfits,
      sex: userProfile.gender,
      style: style.name,
      weather,
    });

    const outfits: GenerateOutfitsResponseDto[] = [];

    generated_outfits.forEach((o) => {
      const garments: GarmentResponseDto[] = [];

      o.garments.forEach((garment_id) => {
        const g = full_user_garments.find((g) => g.id === garment_id);
        if (!g) {
          throw new InternalServerErrorException(
            `Generated garment id ${garment_id} not found`,
          );
        }

        garments.push(g);
      });

      outfits.push({
        name: o.name,
        style_id,
        garments: garments,
      });
    });

    return outfits;
  }
}
