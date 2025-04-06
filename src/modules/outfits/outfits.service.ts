import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOutfitDto } from './dto/create-outfit.dto';
import { UpdateOutfitDto } from './dto/update-outfit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Outfit } from './entities/outfit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OutfitsService {
  constructor(
    @InjectRepository(Outfit)
    private readonly outfitRepository: Repository<Outfit>,
  ) {}

  async create(userId: string, createOutfitDto: CreateOutfitDto): Promise<any> {
    const { garment_ids, style_id } = createOutfitDto;

    try {
      const result = await this.outfitRepository.query(
        `SELECT create_outfit($1, $2, $3)`,
        [userId, garment_ids, style_id],
      );

      // Extract the response from the query result
      const response = result[0]?.create_outfit;

      // Check if the response indicates success
      if (!response?.success) {
        throw new InternalServerErrorException(
          response?.content || 'Failed to create outfit',
        );
      }

      // Return the created outfit details
      return response.content;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error creating outfit ${error.message}`,
      );
    }
  }

  async findAll(userId: string): Promise<any[]> {
    try {
      const result = await this.outfitRepository.query(
        `SELECT get_user_outfit($1)`,
        [userId],
      );

      // Extract the response from the query result
      const response = result[0]?.get_user_outfit;

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
        `Error fetching user garments ${error.message}`,
      );
    }
  }

  async findOne(outfitId: number): Promise<any[]> {
    try {
      const result = await this.outfitRepository.query(
        `SELECT get_outfit_garment($1)`,
        [outfitId],
      );

      // Extract the response from the query result
      const response = result[0]?.get_outfit_garment;

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
        `Error fetching outfit garments ${error.message}`,
      );
    }
  }

  // update(id: number, updateOutfitDto: UpdateOutfitDto) {
  //   return `This action updates a #${id} outfit`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} outfit`;
  // }
}
