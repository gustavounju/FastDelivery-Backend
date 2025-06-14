// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa TypeOrmModule
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Importa tus controladores y servicios
import { ProductoController } from './delivery/delivery.controller.producto.';
import { ProductoService } from './delivery/delivery.service.producto';

// ¡IMPORTANTE! Importa tu entidad Producto.
// ASEGÚRATE que esta ruta sea EXACTA al nombre de tu archivo de entidad.
// Por ejemplo, si tu archivo se llama 'Producto.ts', la ruta sería './entities/Producto'.
// Si tu archivo se llama 'delivery.entity.producto.ts', la ruta es './entities/delivery.entity.producto'.
import { Producto } from './entities/delivery.entity.producto'; // <-- ¡Verifica que esta ruta sea 100% correcta!

@Module({
  imports: [
    // Configuración GLOBAL de TypeORM para tu base de datos MySQL
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mysql',
      database: 'delivery_db',

      // ¡CAMBIO CLAVE AQUÍ! LISTA EXPLÍCITAMENTE TU ENTIDAD PRODUCTO.
      // Esto le da a TypeORM una referencia directa a la clase, sin depender del glob.
      entities: [
        Producto, // <--- ¡AÑADE ESTA LÍNEA! Referencia directa a la clase Producto importada.
        // Aquí agregarías otras entidades como Cliente, Pedido, etc., de la misma manera:
        // Cliente,
        // Pedido,
        // ItemPedido,
        // Repartidor,
      ],

      synchronize: true, // ¡Solo para desarrollo!
    }),

    // Sigue usando forFeature para asegurarte que el Repository<Producto> esté disponible para inyección.
    TypeOrmModule.forFeature([Producto]),
  ],
  controllers: [AppController, ProductoController],
  providers: [AppService, ProductoService],
})
export class AppModule {}
