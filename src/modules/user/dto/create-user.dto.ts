import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  IsString,
  MinLength,
  IsAlphanumeric,
} from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsEmail(null, { message: 'Please provide a valid email format.' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'user123', description: 'User unique username' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  @IsAlphanumeric(null, {
    message: 'Username does not allow other than alpha numeric chars.',
  })
  username: string;

  @ApiProperty({
    example: 'P@ssw0rd!',
    description: 'Strong password (min 8 characters)',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  )
  password: string;
}
