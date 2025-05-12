import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsDateString, IsInt } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @ApiProperty({
    example: 'abc@gmail.com',
    description: "user's email address",
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: 'password123',
    description: "user's password",
  })
  password: string;

  @IsString()
  @ApiProperty({
    example: 'JohnDoe',
    description: "user's pseudo",
  })
  pseudo: string;

  @IsDateString() // Ensures the date is in ISO 8601 format
  @ApiProperty({
    example: '1990-01-01',
    description: "user's birth date",
  })
  birthDate: string;

  @IsInt()
  @ApiProperty({
    example: 1,
    description: "user's gender ID",
  })
  idGender: number;
}

export class RegisterResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: "user's unique identifier",
  })
  id: string; // UUID
  @ApiProperty({
    example: 1,
    description: "user's gender ID",
  })
  id_gender: number; // INT

  @ApiProperty({
    example: 'JohnDoe',
    description: "user's pseudo",
  })
  pseudo: string; // STR

  @ApiProperty({
    example: 'abc@gmail.com',
    description: "user's email address",
  })
  email: string; // STR

  @ApiProperty({
    example: '1990-01-01',
    description: "user's birth date",
  })
  birth_date: Date; // DATE
}
