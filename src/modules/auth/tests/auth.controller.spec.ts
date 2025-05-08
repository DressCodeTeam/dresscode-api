import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    // Création d'un module de test avec le contrôleur et un mock du service
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService) as jest.Mocked<AuthService>;
  });

  describe('login', () => {
    it('should return an access token when credentials are valid', async () => {
      // Données de test
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const expectedToken = { access_token: 'mock-token' };

      // Configuration du mock
      authService.login.mockResolvedValue(expectedToken);

      // Appel de la méthode et vérifications
      const result = await controller.login(loginDto);

      expect(result).toEqual(expectedToken);
      expect(authService.login).toHaveBeenCalledWith(
        loginDto.email,
        loginDto.password,
      );
    });

    it('should throw UnauthorizedException when credentials are invalid', async () => {
      const loginDto: LoginDto = {
        email: 'wrong@example.com',
        password: 'wrongpassword',
      };

      authService.login.mockRejectedValue(
        new UnauthorizedException('Invalid credentials'),
      );

      await expect(controller.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should propagate unexpected errors', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const unexpectedError = new Error('Unexpected error');
      authService.login.mockRejectedValue(unexpectedError);

      await expect(controller.login(loginDto)).rejects.toThrow(unexpectedError);
    });
  });

  describe('register', () => {
    it('should successfully register a new user', async () => {
      // Données de test
      const registerDto: RegisterDto = {
        email: 'new@example.com',
        password: 'newPassword123',
        pseudo: 'newUser',
        birthDate: '1990-01-01',
        idGender: 1,
      };
      const expectedResponse = { id: 1, email: registerDto.email };

      // Configuration du mock
      authService.register.mockResolvedValue(expectedResponse);

      // Appel de la méthode et vérifications
      const result = await controller.register(registerDto);

      expect(result).toEqual(expectedResponse);
      expect(authService.register).toHaveBeenCalledWith(
        registerDto.email,
        registerDto.password,
        registerDto.pseudo,
        expect.any(Date), // Vérifie qu'une Date est passée
        registerDto.idGender,
      );
    });

    it('should throw BadRequestException when registration fails', async () => {
      const registerDto: RegisterDto = {
        email: 'existing@example.com',
        password: 'password123',
        pseudo: 'existingUser',
        birthDate: '1990-01-01',
        idGender: 1,
      };

      authService.register.mockRejectedValue(
        new BadRequestException('Email already exists'),
      );

      await expect(controller.register(registerDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should convert birthDate string to Date object', async () => {
      const registerDto: RegisterDto = {
        email: 'test@example.com',
        password: 'password123',
        pseudo: 'testUser',
        birthDate: '2000-12-31',
        idGender: 2,
      };
      const expectedResponse = { id: 2, email: registerDto.email };

      authService.register.mockImplementation(
        async (email, password, pseudo, birthDate, idGender) => {
          // Vérifie que birthDate est bien une instance de Date
          expect(birthDate).toBeInstanceOf(Date);
          // Vérifie que la date est correctement convertie
          expect(birthDate.toISOString()).toContain('2000-12-31');
          return expectedResponse;
        },
      );

      const result = await controller.register(registerDto);
      expect(result).toEqual(expectedResponse);
    });
  });
});