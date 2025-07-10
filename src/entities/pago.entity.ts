import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Pedido } from './pedido.entity';

@Entity()
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  fecha: Date;

  @Column('decimal')
  total: number;

  @Column()
  estado: string;

  @OneToOne(() => Pedido)
  @JoinColumn()
  pedido: Pedido;
}