import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductoController } from './delivery/delivery.controller.producto.';
import { ProductoService } from './delivery/delivery.service.producto';
import { Producto } from './entities/delivery.entity.producto';
import { CategoriaController } from './delivery/delivery.controller.categoria';
import { CategoriaService } from './delivery/delivery.service.categoria';
import { Categoria } from './entities/delivery.entity.categoria';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mysql',
      database: 'delivery_db',
      entities: [Producto, Categoria],

      synchronize: true, // ¡Solo para desarrollo!
    }),
    TypeOrmModule.forFeature([Producto, Categoria]),
  ],
  controllers: [AppController, ProductoController, CategoriaController],
  providers: [AppService, ProductoService, CategoriaService],
})
export class AppModule {}
