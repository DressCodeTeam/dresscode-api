import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryResponseDto } from './dto/category-response.dto';

type GetCategoriesResponse = {
  get_category: {
    success: boolean;
    content: CategoryResponseDto[];
  };
}[];

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<CategoryResponseDto[]> {
    try {
      const queryResult = (await this.categoryRepository.query(
        `SELECT get_category()`,
      )) as GetCategoriesResponse;

      // Extract the response from the query result
      const categoriesResponse = queryResult[0]?.get_category;

      // Check if the response indicates success
      if (!categoriesResponse?.success) {
        throw new InternalServerErrorException(
          categoriesResponse?.content || 'Failed to fetch categories',
        );
      }

      // Return the content (list of genders)
      return categoriesResponse.content;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching categories: ${error}`,
      );
    }
  }
}
