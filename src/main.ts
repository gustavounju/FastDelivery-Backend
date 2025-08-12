// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de validación
  app.useGlobalPipes(new ValidationPipe());

  // Habilitar CORS
  app.enableCors();

  // ⚠️ IMPORTANTE: Configurar prefijo ANTES de Swagger
  app.setGlobalPrefix('api', {
    exclude: ['health'],  // No incluir 'api/docs' aquí
  });

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('FastDelivery API')
    .setDescription('API de gestión de delivery')
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Servidor Local')  // ⭐ AGREGAR ESTA LÍNEA
    .addTag('productos')
    .addTag('categorias')
    .addTag('auth-admin')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // ⚠️ CAMBIO: Usar 'docs' sin /api porque el prefijo ya se aplicó
  SwaggerModule.setup('docs', app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  console.log(`🚀 Aplicación corriendo en: http://localhost:${PORT}/api`);
  console.log(`📚 Documentación Swagger: http://localhost:${PORT}/api/docs`);
}
bootstrap();