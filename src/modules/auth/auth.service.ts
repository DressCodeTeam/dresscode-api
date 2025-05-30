import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { LoginResponseDto } from './dto/login.dto';
import { RegisterResponseDto } from './dto/register.dto';

type UserDetails = {
  id: string;
  email: string;
  pseudo: string;
};

type ConnectUserResponse = {
  connect_user: {
    success: boolean;
    content: UserDetails;
  };
}[];

type CreateUserResponse = {
  create_user: {
    success: boolean;
    content: RegisterResponseDto;
  };
}[];

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDetails> {
    const queryResult = (await this.userRepository.query(
      `SELECT connect_user($1, $2)`,
      [email, password],
    )) as ConnectUserResponse;

    // Extract the response from the query result
    const userValidationResponse = queryResult[0]?.connect_user;

    // Check if the response indicates a successful validation
    const isValidationSuccessful = userValidationResponse?.success ?? false;

    if (!isValidationSuccessful) {
      // Throw an UnauthorizedException if validation fails
      throw new UnauthorizedException(
        userValidationResponse?.content || 'Invalid credentials',
      );
    }

    // Return the validated user details
    return userValidationResponse.content;
  }

  async login(email: string, password: string): Promise<LoginResponseDto> {
    // Validate the user credentials
    const user: UserDetails = await this.validateUser(email, password);

    // Prepare the payload for the JWT
    const jwtPayload = { sub: user.id, email: user.email };

    // Sign the JWT and return the access token
    return { accessToken: this.jwtService.sign(jwtPayload) };
  }

  async register(
    email: string,
    password: string,
    pseudo: string,
    birthDate: Date,
    idGender: number,
  ): Promise<RegisterResponseDto> {
    // Execute the database function to create a new user
    const queryResult = (await this.userRepository.query(
      `SELECT create_user($1, $2, $3, $4, $5)`,
      [idGender, pseudo, email, birthDate, password],
    )) as CreateUserResponse;

    // Extract the response from the query result
    const userCreationResponse = queryResult[0]?.create_user;

    // Check if the response indicates a successful user creation
    const isCreationSuccessful = userCreationResponse?.success ?? false;

    if (!isCreationSuccessful) {
      // Throw a BadRequestException if user creation fails
      throw new BadRequestException(
        userCreationResponse?.content || 'Registration failed',
      );
    }

    // Return the created user details
    return userCreationResponse.content;
  }
}
