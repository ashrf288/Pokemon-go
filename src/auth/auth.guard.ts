import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
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
      return false; // No token, deny access
    }

    try {
      // Verify and decode the token
      const decoded = this.jwtService.verify(token);

      // Check if the user exists in the database
      const user = await this.prisma.user.findUnique({
        where: {
          id: (await decoded).sub,
        },
      });

      if (!user) {
        return false; // User not found in the database, deny access
      }

      // Attach the user object to the request for further use
      request.user = user;

      return true; // User has a valid token and exists in the database, allow access
    } catch (error) {
      return false; // Token is invalid, deny access
    }
  }
}
