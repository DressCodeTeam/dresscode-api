import {
  IsUUID,
  IsArray,
  IsInt,
  IsNotEmpty,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOutfitDto {
  @IsArray() // Ensures the value is an array
  @ArrayNotEmpty() // Ensures the array is not empty
  @IsInt({ each: true }) // Ensures each element in the array is an integer
  @Type(() => Number) // Transforms each element to a number
  garment_ids: number[]; // List of garment IDs

  @IsInt() // Ensures the value is an integer
  @IsNotEmpty()
  style_id: number; // Represents the style's identifier
}
