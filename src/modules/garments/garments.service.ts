import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateGarmentDto } from './dto/create-garment.dto';
import { UpdateGarmentDto } from './dto/update-garment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Garment } from './entities/garment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GarmentsService {
  constructor(
    @InjectRepository(Garment)
    private readonly garmentRepository: Repository<Garment>,
  ) {}

  async create(
    userId: string,
    createGarmentDto: CreateGarmentDto,
  ): Promise<any> {
    const { image, subcategory_id } = createGarmentDto;

    try {
      const result = await this.garmentRepository.query(
        `SELECT create_garment($1, $2, $3)`,
        [userId, image, subcategory_id],
      );

      // Extract the response from the query result
      const response = result[0]?.create_garment;

      // Check if the response indicates success
      if (!response?.success) {
        throw new InternalServerErrorException(
          response?.content || 'Failed to create garment',
        );
      }

      // Return the created garment details
      return response.content;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error creating garment ${error.message}`,
      );
    }
  }

  async findAll(userId: string): Promise<any[]> {
    try {
      const result = await this.garmentRepository.query(
        `SELECT get_user_garment($1)`,
        [userId],
      );

      // Extract the response from the query result
      const response = result[0]?.get_user_garment;

      // Check if the response indicates success
      if (!response?.success) {
        throw new InternalServerErrorException(
          response?.content || 'Failed to fetch user garments',
        );
      }

      // Return the content (list of garments)
      return response.content;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching user garments');
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} garment`;
  // }

  // update(id: number, updateGarmentDto: UpdateGarmentDto) {
  //   return `This action updates a #${id} garment`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} garment`;
  // }
}
