import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Garment } from './entities/garment.entity';
import { Repository } from 'typeorm';
import { GarmentResponseDto } from './dto/garment-response.dto';

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
  ) {}

  async create(
    userId: string,
    subcategory_id: number,
    imageUrl: string,
  ): Promise<GarmentResponseDto> {
    try {
      const queryResult = (await this.garmentRepository.query(
        `SELECT create_garment($1, $2, $3, $4)`,
        [userId, imageUrl, subcategory_id, 'default description'],
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
