// src/admin/entities/admin.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 'admin' })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  // 🔐 Encriptar contraseña antes de guardar
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  // 🔍 Verificar contraseña
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}