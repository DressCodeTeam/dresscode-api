import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
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
}

export class LoginResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: "user's access token",
  })
  accessToken: string;
}
