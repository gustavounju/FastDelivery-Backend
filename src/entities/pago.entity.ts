import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity()
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @Column('decimal')
  total: number;

  @Column()
  estado: string;

  @Column({ nullable: true })
  mercadoPago: string;
}