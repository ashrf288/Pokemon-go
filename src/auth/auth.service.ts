import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, UserDetailsDto, UpdateUserDto } from './dto';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2'; // Import the argon2 library
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

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

  async changePassword(token: string, dto: AuthDto): Promise<UserDetailsDto> {
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
