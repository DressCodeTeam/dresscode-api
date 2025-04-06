import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateStyleDto } from './dto/create-style.dto';
import { UpdateStyleDto } from './dto/update-style.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Style } from './entities/style.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StylesService {
  constructor(
    @InjectRepository(Style)
    private readonly styleRepository: Repository<Style>,
  ) {}

  // create(createStyleDto: CreateStyleDto) {
  //   return 'This action adds a new style';
  // }

  async findAll(): Promise<any[]> {
    try {
      const result = await this.styleRepository.query(`SELECT get_style()`);

      // Extract the response from the query result
      const response = result[0]?.get_style;

      // Check if the response indicates success
      if (!response?.success) {
        throw new InternalServerErrorException(
          response?.content || 'Failed to fetch styles',
        );
      }

      // Return the content (list of genders)
      return response.content;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching styles ${error.message}`,
      );
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} style`;
  // }

  // update(id: number, updateStyleDto: UpdateStyleDto) {
  //   return `This action updates a #${id} style`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} style`;
  // }
}
