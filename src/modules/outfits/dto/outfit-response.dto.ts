import { ApiProperty } from '@nestjs/swagger';
import { GarmentSummaryDto } from 'src/modules/garments/dto/garment-response.dto';

export class OutfitResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the outfit',
    example: 8,
  })
  id: number;

  @ApiProperty({
    description: 'The style of the outfit',
    example: 'Casual/Décontracté',
  })
  style: string;

  @ApiProperty({
    description: 'A list of garments included in the outfit',
    type: [GarmentSummaryDto],
    example: [
      {
        id: 10,
        image_url: 'link.com',
      },
    ],
  })
  garments: GarmentSummaryDto[];

  @ApiProperty({
    description: 'The date when the outfit was created',
    example: '2025-05-12',
  })
  created_at: string;
}
