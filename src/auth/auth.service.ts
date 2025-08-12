import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../admin/entities/admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  // 🔐 Login de Admin
  async loginAdmin(username: string, password: string) {
    console.log('🔐 Intento de login admin:', username);

    // Buscar admin por username o email
    const admin = await this.adminRepository.findOne({
      where: [
        { username },
        { email: username }, // Permitir login con email también
      ],
    });

    if (!admin) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    // Verificar contraseña
    const isPasswordValid = await admin.validatePassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    // Generar JWT
    const payload = {
      sub: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    };

    console.log('✅ Login exitoso para admin:', admin.username);

    return {
      success: true,
      message: 'Login exitoso',
      access_token: this.jwtService.sign(payload),
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        nombre: admin.nombre,
        apellido: admin.apellido,
        role: admin.role,
      },
    };
  }

  // 🆕 Crear Admin (usar solo una vez o desde comando)
  async createAdmin(data: {
    email: string;
    username: string;
    password: string;
    nombre: string;
    apellido: string;
  }) {
    // Verificar si ya existe
    const existing = await this.adminRepository.findOne({
      where: [{ email: data.email }, { username: data.username }],
    });

    if (existing) {
      throw new ConflictException('El admin ya existe');
    }

    // Crear nuevo admin
    const admin = this.adminRepository.create(data);
    await this.adminRepository.save(admin);

    console.log('✅ Admin creado:', admin.username);

    // No devolver la contraseña
    const { password, ...result } = admin;
    return result;
  }

  // 🔍 Validar Token
  async validateAdmin(payload: any) {
    const admin = await this.adminRepository.findOne({
      where: { id: payload.sub },
    });

    if (!admin || !admin.isActive) {
      throw new UnauthorizedException('Admin no válido');
    }

    return {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    };
  }
}
