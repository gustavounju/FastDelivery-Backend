import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dni: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ type: 'text' })
  direccion: string;

  @Column()
  telefono: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  created_at: Date;
}