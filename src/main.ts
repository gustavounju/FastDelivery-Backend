/*import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();*/
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,           // Elimina propiedades no declaradas en los DTO
    forbidNonWhitelisted: true // Lanza error si llegan propiedades no definidas
  }));

  app.enableCors(); // <-- Habilita CORS para todos los orígenes (solo para desarrollo)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
