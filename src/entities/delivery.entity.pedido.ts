import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Cliente } from './delivery.entity.cliente';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Fecha y hora en que se creó el pedido
  fechaPedido: Date;

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

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // Suma total del pedido (productos + envío)
  montoTotal: number;

  @Column({ type: 'text' }) // Dirección de entrega específica para este pedido
  domicilioEntrega: string;

  @Column({ nullable: true }) // Notas o instrucciones especiales del cliente para el pedido
  notasCliente: string;

  @Column({ type: 'timestamp', nullable: true }) // Hora estimada de entrega al cliente
  horaEstimadaEntrega: Date;

  @Column({ type: 'timestamp', nullable: true }) // Hora real en que el pedido fue entregado
  horaRealEntrega: Date;
}
