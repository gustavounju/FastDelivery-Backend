import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Producto } from './producto.entity';
import { Pedido } from './pedido.entity';

@Entity()
export class DetallePedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido,{ onDelete: 'CASCADE' })
  pedido: Pedido;

  @ManyToOne(() => Producto)
  producto: Producto;

  @Column('decimal')
  precio: number;

  @Column()
  cantidad: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}