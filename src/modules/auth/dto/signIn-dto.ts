import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

// signIn complete Dto
export class SignInDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: "Email de l'utilisateur",
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: "Mot de passe de l'utilisateur",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
