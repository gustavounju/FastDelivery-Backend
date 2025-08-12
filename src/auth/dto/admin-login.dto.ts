// src/auth/dto/admin-login.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdminLoginDto {
  @ApiProperty({
    example: 'admin',
    description: 'Username o email del administrador',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'Admin123!',
    description: 'Contraseña del administrador',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

