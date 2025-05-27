import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { GarmentResponseDto } from 'src/modules/garments/dto/garment-response.dto';

export class GenerateOutfitsDto {
  @ApiProperty({ example: 3, description: 'Number of outfits to generate' })
  @IsInt()
  @Min(1)
  nb_outfits: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The unique identifier of the outfit',
    example: 8,
  })
  style_id: number;

  @ApiProperty({ example: 'sunny', description: 'Weather condition' })
  @IsString()
  weather: string;
}

export class GenerateOutfitsResponseDto {
  @ApiProperty({
    example: 'Outfit 1',
    description: 'Title of the generated outfit',
  })
  name: string;

  @ApiProperty({
    description: 'The unique identifier of the outfit',
    example: 8,
  })
  style_id: number;

  @ApiProperty({
    description: 'A list of garments included in the outfit',
    type: [GarmentResponseDto],
  })
  garments: GarmentResponseDto[];
}
