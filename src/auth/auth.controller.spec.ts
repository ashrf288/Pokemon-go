import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthDto, UserDetailsDto, UpdateUserDto } from './dto';
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
  it('should return the user details', async () => {
    const expectedUser: UserDetailsDto = {
      id: 1,
      email: 'test@test.com',
      name: 'test',
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: false,
    };
    jest.spyOn(authService, 'user').mockResolvedValue(expectedUser);
    const result = await authController.user('mockedToken');
    expect(result).toBe(expectedUser);
  });

  it('should update the user and return the updated user', async () => {
    const updateUserDto: UpdateUserDto = {
      email: 'test1@test.com',
      name: 'test',
    };
    const expectedUser: UserDetailsDto = {
      id: 1,
      email: 'test1@test.com',
      name: 'test',
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: false,
    };
    jest.spyOn(authService, 'update').mockResolvedValue(expectedUser);
    const result = await authController.updateUser(
      'mockedToken',
      updateUserDto,
    );
    expect(result).toBe(expectedUser);
  });

  it('should delete the user and return a message', async () => {
    const expectedMessage = 'User test has been deleted';
    jest.spyOn(authService, 'delete').mockResolvedValue(expectedMessage);
    const result = await authController.deleteUser('mockedToken');
    expect(result).toBe(expectedMessage);
  });

  it('test getUserId', async () => {
    const expectedId = 1;
    jest.spyOn(authService, 'getUserId').mockResolvedValue(expectedId);
    const result = await authService.getUserId('mockedToken');
    expect(result).toBe(expectedId);
  });
});
