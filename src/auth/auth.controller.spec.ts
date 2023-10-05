import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), PrismaModule],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    it('should create a new user and return it', async () => {
      const authDto: AuthDto = {
        email: 'test@test.com',
        password: '12345678',
        name: 'test',
      };
      const currentDate = new Date();
      const expectedUser = {
        id: 1,
        email: 'test@test.com',
        password: '12345678',
        name: 'test',
        createdAt: currentDate,
        updatedAt: currentDate,
        isAdmin: false,
      }; // Define the expected user object here

      jest.spyOn(authService, 'signup').mockResolvedValue(expectedUser);

      const result = await authController.signup(authDto);

      expect(result).toBe(expectedUser);
    });
  });

  describe('signin', () => {
    it('should authenticate the user and return a response with an "access_token" key', async () => {
      const authDto: AuthDto = {
        email: 'test@test.com',
        password: '12345678',
      };

      jest
        .spyOn(authService, 'signin')
        .mockResolvedValue({ access_token: 'mockedToken' });

      const result = await authController.signin(authDto);

      expect(result).toHaveProperty('access_token');
    });
  });
});
