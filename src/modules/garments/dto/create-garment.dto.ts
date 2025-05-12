import { IsInt, IsNotEmpty, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGarmentDto {
  @IsUrl() // Ensures the value is a valid URL
  @IsNotEmpty()
  @ApiProperty({
    description: 'The URL of the garment image',
    example: 'https://example.com/image.jpg',
  })
  image: string; // Represents the image URL

  @IsInt()
  @Type(() => Number) // Ensures the value is transformed to a number
  @IsNotEmpty()
  @ApiProperty({
    description: 'The subcategory id of the garment (e.g., Winter, Summer)',
    example: 1,
  })
  subcategory_id: number;
}
