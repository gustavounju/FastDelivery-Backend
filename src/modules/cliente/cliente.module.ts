import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { Cliente } from 'src/entities/cliente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from 'src/entities/pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Pedido])],
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService]
})
export class ClienteModule {}
