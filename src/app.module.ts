import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CategoriaModule } from './modules/categoria/categoria.module';
import { ProductoModule } from './modules/producto/producto.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { CadeteModule } from './modules/cadete/cadete.module';
import { PagoModule } from './modules/pago/pago.module';
import { PedidoModule } from './modules/pedido/pedido.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mysql',
      database: 'delivery_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // ¡Solo para desarrollo!
    }),
    CategoriaModule,
    ProductoModule,
    ClienteModule,
    CadeteModule,
    PedidoModule,
    PagoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
