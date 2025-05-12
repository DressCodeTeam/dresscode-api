import { IsArray, IsInt, IsNotEmpty, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOutfitDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Type(() => Number)
  @ApiProperty({
    description: 'Array of garment IDs that make up the outfit',
    example: [1, 2, 3],
    type: [Number],
  })
  garment_ids: number[];

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the style associated with the outfit',
    example: 1,
  })
  style_id: number;
}
