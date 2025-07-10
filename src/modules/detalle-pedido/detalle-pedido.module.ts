import { Module } from '@nestjs/common';
import { DetallePedidoService } from './detalle-pedido.service';
import { DetallePedidoController } from './detalle-pedido.controller';
import { DetallePedido } from 'src/entities/detallePedido.entity';
import { Pedido } from 'src/entities/pedido.entity';
import { Producto } from 'src/entities/producto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DetallePedido,Pedido,Producto])],
  controllers: [DetallePedidoController],
  providers: [DetallePedidoService],
  exports: [DetallePedidoService]
})
export class DetallePedidoModule {}
