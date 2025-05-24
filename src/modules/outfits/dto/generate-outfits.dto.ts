import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class GenerateOutfitsDto {
  @ApiProperty({ example: 3, description: 'Number of outfits to generate' })
  @IsInt()
  @Min(1)
  nb_outfits: number;

  @ApiProperty({ example: 'casual', description: 'Style of the outfits' })
  @IsString()
  style: string;

  @ApiProperty({ example: 'sunny', description: 'Weather condition' })
  @IsString()
  weather: string;
}
