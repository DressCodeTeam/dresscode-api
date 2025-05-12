import { ApiProperty } from '@nestjs/swagger';

export class StyleResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the style',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the style',
    example: 'Casual/Décontracté',
  })
  name: string;
}
