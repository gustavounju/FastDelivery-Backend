import { Module } from '@nestjs/common';
import { PagoService } from './pago.service';
import { PagoController } from './pago.controller';
import { Pago } from 'src/entities/pago.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Pago])],
  controllers: [PagoController],
  providers: [PagoService],
  exports: [PagoService]
})
export class PagoModule {}
