import {
  Injectable,
  ForbiddenException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  AuthDto,
  UserDetailsDto,
  UpdateUserDto,
  ChangePasswordDto,
} from './dto';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2'; // Import the argon2 library
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService implements OnApplicationBootstrap {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}
  // create  admin user on app start
  async onApplicationBootstrap() {
    const admin = await this.prisma.user.findUnique({
      where: {
        email: 'admin@admin.com',
      },
    });
    if (!admin) {
      const password = await argon.hash('admin1234');
      await this.prisma.user.create({
        data: {
          email: 'admin@admin.com',
          password,
          name: 'admin',
          isAdmin: true,
        },
      });
    }
  }

  async signup(dto: AuthDto): Promise<UserDetailsDto> {
    // generate the password hash
    const password = await argon.hash(dto.password);
    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password,
          name: dto.name,
        },
      });
      // return this.signToken(user.id, user.email);

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        isAdmin: user.isAdmin,
      };
    } catch (err) {
      throw new ForbiddenException('this Email already exists');
    }

    // if email already exists throw exception
  }

  async signin(dto: AuthDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');

    // compare password
    const pwMatches = await argon.verify(user.password, dto.password);
    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    return this.signToken(user.id);
  }

  async user(token: string): Promise<UserDetailsDto> {
    const id = await this.getUserId(token);
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      isAdmin: user.isAdmin,
    };
  }

  // remove user from db
  async delete(token: string): Promise<string> {
    const id = await this.getUserId(token);
    const user = await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return `User ${user.name} has been deleted`;
  }

  async update(token: string, dto: UpdateUserDto): Promise<UserDetailsDto> {
    const id = await this.getUserId(token);
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email: dto.email,
        name: dto.name,
      },
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      isAdmin: user.isAdmin,
    };
  }

  async changePassword(
    token: string,
    dto: ChangePasswordDto,
  ): Promise<UserDetailsDto> {
    const id = await this.getUserId(token);
    const password = await argon.hash(dto.password);

    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      isAdmin: user.isAdmin,
    };
  }

  async signToken(userId: number): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = jwt.sign(payload, secret, { expiresIn: '60m' });

    return {
      access_token: token,
    };
  }

  async verify(token: string): Promise<{ sub: number }> {
    const secret = this.config.get('JWT_SECRET');

    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          reject(error);
        } else {
          resolve(decoded as { sub: number });
        }
      });
    });
  }
  async getUserId(token: string): Promise<number> {
    const secret = this.config.get('JWT_SECRET');
    token = token.replace('Bearer ', '');
    const { sub } = jwt.verify(token, secret);
    return sub;
  }
}

// test logic for auth.service.ts

// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthService } from './auth.service';
// import { AuthDto } from './dto';
// import { ConfigModule } from '@nestjs/config';
// import { PrismaModule } from '../prisma/prisma.module';
// import * as argon from 'argon2';
// import * as jwt from 'jsonwebtoken';

// describe('AuthService', () => {
//   let service: AuthService;
//   let user: AuthDto;
//   let token: string;
//   let userId: number;
//   let secret: string;

//   beforeAll(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [ConfigModule.forRoot(), PrismaModule],
//       providers: [AuthService],
//     }).compile();
//     service = module.get<AuthService>(AuthService);
//     user = {
//       email: 'test@test',
//       password: '12345678',
//       name: 'test',
//     };
//     const { access_token } = await service.signup(user);
//     token = access_token;
//     const { sub } = await service.verify(token);
//     userId = sub;
//     secret = service.secret;
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   it('should create a new user', async () => {
//     const { access_token } = await service.signup(user);
//     expect(access_token).toBeDefined();
//   });

//   it('should sign a user in', async () => {
//     const { access_token } = await service.signin(user);
//     expect(access_token).toBeDefined();
//   });

//   it('should return a user', async () => {
//     const user = await service.user(token);
//     expect(user).toBeDefined();
//     expect(user.id).toEqual(userId);
//   });

//   it('should delete a user', async () => {
//     const message = await service.delete(token);
//     expect(message).toBeDefined();
//     expect(message).toEqual(`User ${user.name} has been deleted`);
//   });

//   it('should update a user', async () => {
//     const updatedUser = await service.update(token, {
//       email: 'test@test',
//       name: 'test',
//     });
//     expect(updatedUser).toBeDefined
