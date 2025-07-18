# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned

- [ ] Autenticación JWT
- [ ] Rate limiting
- [ ] Métricas de performance
- [ ] Cache con Redis
- [ ] Notificaciones push

## [0.0.1] - 2025-01-18

### Added

- ✨ Sistema base de gestión de productos
- ✨ Módulo de categorías de productos
- ✨ Gestión de clientes
- ✨ Sistema de cadetes (repartidores)
- ✨ Gestión completa de pedidos
- ✨ Procesamiento de pagos con MercadoPago
- ✨ Sistema de detalles de pedidos
- ✨ Notificaciones por email con plantillas
- ✨ Upload de imágenes para productos
- ✨ Documentación automática con Swagger
- ✨ Validación de datos con class-validator
- ✨ Base de datos MySQL con TypeORM
- ✨ Containerización con Docker
- ✨ Configuración de CORS
- ✨ Servicio de archivos estáticos

### Technical

- 🔧 Configuración inicial de NestJS
- 🔧 Setup de TypeORM con MySQL
- 🔧 Configuración de Mailer con Handlebars
- 🔧 Setup de Docker Compose
- 🔧 Configuración de ESLint y Prettier
- 🔧 Setup de testing con Jest
- 🔧 Configuración de ValidationPipe global

### Database Schema

- 📄 Entidad Producto con relación a Categoria
- 📄 Entidad Cliente con validaciones únicas
- 📄 Entidad Cadete para repartidores
- 📄 Entidad Pedido con relaciones a Cliente y Cadete
- 📄 Entidad DetallePedido para items de pedidos
- 📄 Entidad Pago con relación OneToOne a Pedido
- 📄 Entidad Categoria con relación a Productos

### API Endpoints

- 🌐 CRUD completo para Productos (/api/productos)
- 🌐 CRUD completo para Categorías (/api/categorias)
- 🌐 CRUD completo para Clientes (/api/cliente)
- 🌐 CRUD completo para Cadetes (/api/cadete)
- 🌐 CRUD completo para Pedidos (/api/pedido)
- 🌐 CRUD completo para Pagos (/api/pago)
- 🌐 CRUD completo para Detalles de Pedido (/api/detalle-pedido)
- 🌐 Endpoint de upload de imágenes

### Documentation

- 📚 Documentación completa con Swagger/OpenAPI
- 📚 README profesional con ejemplos
- 📚 Especificación de DTOs con validaciones
- 📚 Documentación de arquitectura

## [0.0.0] - 2025-01-15

### Initial

- 🎉 Proyecto inicializado con NestJS CLI
- 🎉 Configuración inicial de TypeScript
- 🎉 Setup básico de estructura modular
