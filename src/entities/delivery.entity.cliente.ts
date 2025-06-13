import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ unique: true }) // El email debe ser único para cada cuenta
  email: string;

  @Column({ length: 20 }) // El teléfono puede incluir prefijos o caracteres no numéricos
  telefono: string;

  @Column({ type: 'text' }) // Dirección principal de domicilio para la entrega
  domicilioPrincipal: string;

  @Column({ default: true }) // Indica si la cuenta del cliente está activa en la plataforma
  estaActivo: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Fecha de creación de la cuenta
  fechaRegistro: Date;
}
