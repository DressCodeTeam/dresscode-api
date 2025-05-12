import { ApiProperty } from '@nestjs/swagger';

export class SubcategoryResponseDto {
  @ApiProperty({
    example: 1,
    description: 'category ID',
  })
  id: number;

  @ApiProperty({
    example: 'Hiver',
    description: 'subcategory name',
  })
  name: string;
}
