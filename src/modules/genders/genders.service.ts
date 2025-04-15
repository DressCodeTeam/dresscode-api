import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from './entities/gender.entity';

@Injectable()
export class GendersService {
  constructor(
    @InjectRepository(Gender)
    private readonly genderRepository: Repository<Gender>,
  ) {}

  async findAll(): Promise<any[]> {
    try {
      const result = await this.genderRepository.query(`SELECT get_gender()`);

      // Extract the response from the query result
      const response = result[0]?.get_gender;

      // Check if the response indicates success
      if (!response?.success) {
        throw new InternalServerErrorException(
          response?.content || 'Failed to fetch genders',
        );
      }

      // Return the content (list of genders)
      return response.content;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching genders ${error.message}`,
      );
    }
  }
}
