import { ApiProperty } from '@nestjs/swagger';

export class GarmentResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the garment',
    example: 10,
  })
  id: number;

  @ApiProperty({
    description: 'The URL of the garment image',
    example: 'https://example.com/image.jpg',
  })
  image_url: string;

  @ApiProperty({
    description: 'The subcategory of the garment (e.g., Winter, Summer)',
    example: 'Hiver',
  })
  subcategory: string;

  @ApiProperty({
    description: 'A description of the garment (nullable)',
    example: null,
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: 'The date when the garment was created',
    example: '2025-04-06',
  })
  created_at: string;
}

export class GarmentSummaryDto {
  @ApiProperty({
    description: 'The unique identifier of the garment',
    example: 10,
  })
  id: number;

  @ApiProperty({
    description: 'The URL of the garment image',
    example: 'link.com',
  })
  image_url: string;
}
