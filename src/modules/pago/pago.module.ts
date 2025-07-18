import { Module } from '@nestjs/common';
import { PagoService } from './pago.service';
import { PagoController } from './pago.controller';
import { Pago } from 'src/entities/pago.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from 'src/entities/pedido.entity';
import { PagoMailService } from './mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pago,Pedido])],
  controllers: [PagoController],
  providers: [PagoService,PagoMailService],
  exports: [PagoService]
})
export class PagoModule {}
