import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsDateString } from 'class-validator';

export class UserProfileDto {
  @ApiProperty({ example: 'male', description: 'Gender of the user' })
  @IsString()
  gender: string;

  @ApiProperty({ example: 'johndoe', description: 'User pseudonym' })
  @IsString()
  pseudo: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '2000-05-15',
    description: 'User birth date (YYYY-MM-DD)',
  })
  @IsDateString()
  birth_date: string;
}
