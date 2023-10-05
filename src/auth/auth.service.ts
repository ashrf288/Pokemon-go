import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2'; // Import the argon2 library
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    // generate the password hash
    const password = await argon.hash(dto.password);
    // save the new user in the db

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password,
      },
    });

    // return this.signToken(user.id, user.email);
    return user;
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
}
