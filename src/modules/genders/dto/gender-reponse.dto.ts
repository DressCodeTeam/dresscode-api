import { ApiProperty } from '@nestjs/swagger';

export class GenderResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the gender',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the gender',
    example: 'Homme',
  })
  name: string;
}
