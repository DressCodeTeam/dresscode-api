import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from './entities/gender.entity';
import { GenderResponseDto } from './dto/gender-reponse.dto';
type GetGendersResponse = {
  get_gender: {
    success: boolean;
    content: GenderResponseDto[];
  };
}[];
@Injectable()
export class GendersService {
  constructor(
    @InjectRepository(Gender)
    private readonly genderRepository: Repository<Gender>,
  ) {}

  async findAll(): Promise<GenderResponseDto[]> {
    try {
      const queryResult = (await this.genderRepository.query(
        `SELECT get_gender()`,
      )) as GetGendersResponse;

      // Extract the response from the query result
      const response = queryResult[0]?.get_gender;

      // Check if the response indicates success
      if (!response?.success) {
        throw new InternalServerErrorException(
          response?.content || 'Failed to fetch genders',
        );
      }

      // Return the content (list of genders)
      return response.content;
    } catch (error) {
      throw new InternalServerErrorException(`Error fetching genders ${error}`);
    }
  }
}
