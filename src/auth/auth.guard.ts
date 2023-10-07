import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) {
      throw new UnauthorizedException(
        'please provide a valid token in the authorization header',
      );
    }
    try {
      const tokenWithoutBearer = token.replace('Bearer ', '');
      const decoded = this.jwtService.verify(tokenWithoutBearer);
      const user = await this.prisma.user.findUnique({
        where: {
          id: (await decoded).sub,
        },
      });
      if (!user) {
        throw new UnauthorizedException(
          'this token does not match any user in the database',
        );
      }
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('this token is not valid or has expired');
    }
  }
}

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);
    // Check if the user has the 'admin' role
    if (user && user.isAdmin) {
      return true; // User has the 'admin' role, allow access
    }

    throw new UnauthorizedException(
      'Only admin users are allowed to perform this action',
    );
  }
}
