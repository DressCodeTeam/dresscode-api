import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryResponseDto } from './dto/category-response.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all garment categories and subcategories' })
  @ApiOkResponse({
    description: 'List of all garment categories and subcategories',
    type: CategoryResponseDto,
    isArray: true,
  })
  async findAll(): Promise<CategoryResponseDto[]> {
    return this.categoriesService.findAll();
  }
}
