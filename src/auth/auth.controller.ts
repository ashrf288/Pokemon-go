import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, UpdateUserDto } from './dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  user(@Headers() headers: any) {
    return this.authService.user(headers.authorization);
  }
  @Patch('user')
  @UseGuards(AuthGuard)
  updateUser(@Headers() headers: any, @Body() dto: UpdateUserDto) {
    return this.authService.update(headers.authorization, dto);
  }
  @Delete('user')
  @UseGuards(AuthGuard)
  deleteUser(@Headers() headers: any) {
    return this.authService.delete(headers.authorization);
  }
}

export { AuthService };
