import { ApiProperty } from '@nestjs/swagger';
import { SubcategoryResponseDto } from './subcategory-response.dto';

export class CategoryResponseDto {
  @ApiProperty({
    example: 1,
    description: 'category ID',
  })
  id: number;

  @ApiProperty({
    example: 'Hauts',
    description: 'category name',
  })
  name: string;

  @ApiProperty({
    description: 'subcategories of the category',
    type: () => SubcategoryResponseDto,
    isArray: true,
  })
  subcategories: SubcategoryResponseDto[];
}
