import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Producto } from './producto.entity';
import { Cliente } from './cliente.entity';
import { Cadete } from './cadete.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Producto)
  producto: Producto;

  @ManyToOne(() => Cliente, { nullable: true })
  cliente: Cliente;

  @ManyToOne(() => Cadete, { nullable: true })
  cadete: Cadete;

  @Column()
  cantidad: number;

  @Column('decimal')
  total: number;

  @CreateDateColumn()
  fecha: Date;

  @Column()
  estado: string;
  
  @Column({ nullable: true }) // Notas o instrucciones especiales del cliente para el pedido
  observacion: string;
}