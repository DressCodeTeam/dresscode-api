import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { StyleResponseDto } from './dto/style-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Style } from './entities/style.entity';
import { Repository } from 'typeorm';

type GetStylesResponse = {
  get_style: {
    success: boolean;
    content: StyleResponseDto[];
  };
}[];

@Injectable()
export class StylesService {
  constructor(
    @InjectRepository(Style)
    private readonly styleRepository: Repository<Style>,
  ) {}

  async findAll(): Promise<StyleResponseDto[]> {
    try {
      const queryResult = (await this.styleRepository.query(
        `SELECT get_style()`,
      )) as GetStylesResponse;

      // Extract the response from the query result
      const response = queryResult[0]?.get_style;

      // Check if the response indicates success
      if (!response?.success) {
        throw new InternalServerErrorException(
          response?.content || 'Failed to fetch styles',
        );
      }

      // Return the content (list of genders)
      return response.content;
    } catch (error) {
      throw new InternalServerErrorException(`Error fetching styles ${error}`);
    }
  }
}
