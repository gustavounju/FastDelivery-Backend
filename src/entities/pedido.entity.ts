import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Producto } from './producto.entity';
import { Cliente } from './cliente.entity';
import { Cadete } from './cadete.entity';
import { Pago } from './pago.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Producto)
  producto: Producto;

  @ManyToOne(() => Cliente)
  cliente: Cliente;

  @ManyToOne(() => Cadete, { nullable: true })
  cadete: Cadete;

  @ManyToOne(() => Pago, { nullable: true }) // FK opcional
  @JoinColumn()
  pago: Pago;

  @Column()
  cantidad: number;

  @Column('decimal')
  total: number;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @Column({
    type: 'enum',
    enum: [
      'PENDIENTE',
      'EN_PREPARACION',
      'EN_CAMINO',
      'ENTREGADO',
      'CANCELADO',
    ],
    default: 'PENDIENTE',
  })
  estado:
    | 'PENDIENTE'
    | 'EN_PREPARACION'
    | 'EN_CAMINO'
    | 'ENTREGADO'
    | 'CANCELADO';
  
  @Column({ nullable: true }) // Notas o instrucciones especiales del cliente para el pedido
  observacion: string;
}