import { IsEmail, IsString, IsDateString, IsInt } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  pseudo: string;

  @IsDateString() // Ensures the date is in ISO 8601 format
  birthDate: string;

  @IsInt()
  idGender: number;
}
