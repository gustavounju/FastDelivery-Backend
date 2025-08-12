// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('auth-admin')
@Controller('auth/admin')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login de administrador' })
  @ApiResponse({ status: 200, description: 'Login exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async loginAdmin(@Body() loginDto: AdminLoginDto) {
    return this.authService.loginAdmin(loginDto.username, loginDto.password);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener perfil del admin actual' })
  getProfile(@Request() req) {
    return {
      success: true,
      admin: req.user,
    };
  }

  // 🔒 ENDPOINT PROTEGIDO: Solo usar para crear el primer admin
  @Post('create-first-admin')
  @ApiOperation({
    summary: 'Crear primer admin (USAR SOLO UNA VEZ)',
    description:
      'Endpoint temporal para crear el primer administrador. Eliminar en producción.',
  })
  async createFirstAdmin() {
    // Datos del primer admin (CAMBIAR ESTOS DATOS)
    const adminData = {
      email: 'admin@fastdelivery.com',
      username: 'admin',
      password: 'Admin123!', // CAMBIAR EN PRODUCCIÓN
      nombre: 'Super',
      apellido: 'Admin',
    };

    return this.authService.createAdmin(adminData);
  }
}
