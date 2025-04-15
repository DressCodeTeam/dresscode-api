import { IsInt, IsNotEmpty, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

// TODO file uploading
export class CreateGarmentDto {
  @IsUrl() // Ensures the value is a valid URL
  @IsNotEmpty()
  image: string; // Represents the image URL

  @IsInt()
  @Type(() => Number) // Ensures the value is transformed to a number
  @IsNotEmpty()
  subcategory_id: number;
}
