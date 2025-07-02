import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('repartidores')
export class Repartidor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100, nullable: true })
  apellido: string;

  @Column({ length: 20, unique: true }) // Teléfono del repartidor (puede ser su ID de usuario)
  telefono: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({
    type: 'enum',
    enum: ['DISPONIBLE', 'EN_ENTREGA', 'FUERA_DE_SERVICIO'],
    default: 'DISPONIBLE',
  })
  estado: 'DISPONIBLE' | 'EN_ENTREGA' | 'FUERA_DE_SERVICIO';
}
