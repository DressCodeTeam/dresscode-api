import { ApiProperty } from '@nestjs/swagger';

export class CreateGarmentDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file to upload',
  })
  image: any; // Must be `any`, as it's a file (Multer handles it) Represents the image URL

  // TODO: Remove
  // @IsInt()
  // @Type(() => Number) // Ensures the value is transformed to a number
  // @IsNotEmpty()
  // @ApiProperty({
  //   description: 'The subcategory id of the garment (e.g., Winter, Summer)',
  //   example: 1,
  // })
  // subcategory_id: number;
}
