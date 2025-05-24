import { ApiProperty } from '@nestjs/swagger';

export class CreateGarmentDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file to upload',
  })
  image: any; // Must be `any`, as it's a file (Multer handles it) Represents the image URL
}
