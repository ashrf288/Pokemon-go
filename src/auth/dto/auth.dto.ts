import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  name?: string;
}

export class UserDetailsDto {
  id: number;

  @IsEmail()
  email: string;

  name: string;
  createdAt: Date;
  updatedAt: Date;
  isAdmin: boolean;
}

export class UpdateUserDto {
  @IsEmail()
  email: string;

  name: string;
}

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  new_password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  old_password: string;
}
