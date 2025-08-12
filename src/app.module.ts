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
import { DetallePedidoModule } from './modules/detalle-pedido/detalle-pedido.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AuthModule } from './auth/auth.module';

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
    MailerModule.forRoot({
      transport: {
        host: 'sandbox.smtp.mailtrap.io',
        port: 587,
        secure: false,
        auth: {
          user: '82d69621d58342',
          pass: 'a5ff5312b73e17',
        },
        tls: {
          rejectUnauthorized: false, // 👈 ESTO SOLUCIONA EL ERROR QUE TE DIO
        },
      },
      defaults: {
        from: '"Delivery App" <fastdelivery@gmail.com>',
      },
      template: {
        dir: join(process.cwd(), 'templates'), //join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    CategoriaModule,
    ProductoModule,
    ClienteModule,
    CadeteModule,
    PedidoModule,
    PagoModule,
    DetallePedidoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
