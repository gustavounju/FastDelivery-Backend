import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { Pedido } from 'src/entities/pedido.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from 'src/entities/producto.entity';
import { Cliente } from 'src/entities/cliente.entity';
import { Cadete } from 'src/entities/cadete.entity';
import { DetallePedido } from 'src/entities/detallePedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, Cliente, Cadete, Producto, DetallePedido])],
  controllers: [PedidoController],
  providers: [PedidoService],
  exports: [PedidoService]
})
export class PedidoModule {}
