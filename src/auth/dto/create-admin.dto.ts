// src/auth/dto/create-admin.dto.ts
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateAdminDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsString()
  nombre: string;

  @IsString()
  apellido: string;
}
