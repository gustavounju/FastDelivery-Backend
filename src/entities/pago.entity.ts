import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Pedido } from './pedido.entity';

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

  @OneToOne(() => Pedido, pedido => pedido.pago)
  pedido: Pedido;
}