# 🚚 FastDelivery API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
</p>

## 📋 Descripción

**FastDelivery API** es una aplicación backend robusta desarrollada con **NestJS** y **TypeScript** que proporciona un sistema completo de gestión para servicios de delivery. La API incluye funcionalidades para administrar productos, categorías, clientes, cadetes (repartidores), pedidos, pagos y detalles de pedidos.

### 🎯 Características Principales

- ✅ **Gestión completa de productos** con categorías y upload de imágenes
- ✅ **Sistema de pedidos** con estados y observaciones
- ✅ **Administración de clientes** y cadetes (repartidores)
- ✅ **Procesamiento de pagos** integrado con MercadoPago
- ✅ **Notificaciones por email** con plantillas HTML
- ✅ **Documentación automática** con Swagger/OpenAPI
- ✅ **Validación de datos** con class-validator
- ✅ **Base de datos MySQL** con TypeORM
- ✅ **Conteneurización** con Docker
- ✅ **Arquitectura modular** y escalable

## 🏗️ Arquitectura del Proyecto

```
src/
├── app.module.ts                 # Módulo principal de la aplicación
├── main.ts                       # Punto de entrada de la aplicación
├── entities/                     # Entidades de base de datos (TypeORM)
│   ├── cadete.entity.ts         # 🚴 Entidad para repartidores
│   ├── categoria.entity.ts      # 📂 Entidad para categorías de productos
│   ├── cliente.entity.ts        # 👤 Entidad para clientes
│   ├── detallePedido.entity.ts  # 📄 Detalles de items en pedidos
│   ├── pago.entity.ts           # 💳 Entidad para pagos
│   ├── pedido.entity.ts         # 📦 Entidad principal de pedidos
│   └── producto.entity.ts       # 🛍️ Entidad para productos
├── modules/                      # Módulos funcionales
│   ├── cadete/                  # Gestión de repartidores
│   ├── categoria/               # Gestión de categorías
│   ├── cliente/                 # Gestión de clientes
│   ├── detalle-pedido/          # Gestión de detalles de pedidos
│   ├── pago/                    # Procesamiento de pagos
│   ├── pedido/                  # Gestión de pedidos
│   └── producto/                # Gestión de productos
└── templates/                    # Plantillas HTML para emails
    └── pago-confirmado.hbs      # Plantilla de confirmación de pago
```

## 🗄️ Modelo de Datos

### Entidades Principales

#### 👤 **Cliente**

```typescript
{
  id: number
  dni: string (único)
  nombre: string
  apellido: string
  direccion: string
  telefono?: string
  email: string (único)
  created_at: Date
}
```

#### 🛍️ **Producto**

```typescript
{
  id: number
  nombre: string
  descripcion?: string
  precio: decimal(10,2)
  stock: number
  imagen_url?: string
  imagen_nombre?: string
  mercadoPagoLink: string
  created_at: Date
  categoria: Categoria
}
```

#### 📦 **Pedido**

```typescript
{
  id: number
  cliente?: Cliente
  cadete?: Cadete
  total: decimal
  fecha: Date
  estado: string
  observacion?: string
}
```

#### 💳 **Pago**

```typescript
{
  id: number;
  fecha: Date;
  total: decimal;
  estado: string;
  pedido: Pedido;
}
```

### Relaciones

- **Producto** ↔ **Categoria** (ManyToOne)
- **Pedido** ↔ **Cliente** (ManyToOne)
- **Pedido** ↔ **Cadete** (ManyToOne)
- **DetallePedido** ↔ **Pedido** (ManyToOne)
- **DetallePedido** ↔ **Producto** (ManyToOne)
- **Pago** ↔ **Pedido** (OneToOne)

## 🚀 Instalación y Configuración

### ⚡ Setup Rápido

```bash
# Clona el repositorio
git clone https://github.com/GuillermoCruz27/Project-Delivery-Server.git
cd Project-Delivery-Server

# Ejecuta el script de configuración automática
# Para Linux/macOS:
chmod +x scripts/setup.sh
./scripts/setup.sh

# Para Windows:
scripts\setup.bat

# Inicia la aplicación
npm run start:dev
```

### Prerrequisitos

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **MySQL** >= 8.0
- **Docker** (opcional)

### 1️⃣ Clonación del Repositorio

```bash
git clone https://github.com/GuillermoCruz27/Project-Delivery-Server.git
cd Project-Delivery-Server
```

### 2️⃣ Instalación de Dependencias

```bash
npm install
```

### 3️⃣ Configuración de Base de Datos

#### Opción A: Docker (Recomendado)

```bash
# Navegar al directorio de Docker Compose
cd docker-compose

# Iniciar contenedor MySQL
docker-compose up -d
```

#### Opción B: MySQL Local

1. Crear base de datos:

```sql
CREATE DATABASE delivery_db;
```

2. Configurar credenciales en `src/app.module.ts`

### 4️⃣ Ejecución de la Aplicación

```bash
# Desarrollo
npm run start:dev

# Producción
npm run start:prod

# Modo debug
npm run start:debug
```

### 5️⃣ Verificación

- **API**: http://localhost:3000/api
- **Documentación**: http://localhost:3000/api/docs
- **Health Check**: http://localhost:3000/api

## 📚 API Endpoints

### 🛍️ Productos

| Método   | Endpoint                | Descripción                |
| -------- | ----------------------- | -------------------------- |
| `GET`    | `/api/productos`        | Listar todos los productos |
| `GET`    | `/api/productos/:id`    | Obtener producto por ID    |
| `POST`   | `/api/productos`        | Crear nuevo producto       |
| `PUT`    | `/api/productos/:id`    | Actualizar producto        |
| `DELETE` | `/api/productos/:id`    | Eliminar producto          |
| `POST`   | `/api/productos/upload` | Subir imagen de producto   |

### 📂 Categorías

| Método   | Endpoint              | Descripción                 |
| -------- | --------------------- | --------------------------- |
| `GET`    | `/api/categorias`     | Listar todas las categorías |
| `GET`    | `/api/categorias/:id` | Obtener categoría por ID    |
| `POST`   | `/api/categorias`     | Crear nueva categoría       |
| `PUT`    | `/api/categorias/:id` | Actualizar categoría        |
| `DELETE` | `/api/categorias/:id` | Eliminar categoría          |

### 👤 Clientes

| Método   | Endpoint           | Descripción               |
| -------- | ------------------ | ------------------------- |
| `GET`    | `/api/cliente`     | Listar todos los clientes |
| `GET`    | `/api/cliente/:id` | Obtener cliente por ID    |
| `POST`   | `/api/cliente`     | Crear nuevo cliente       |
| `PUT`    | `/api/cliente/:id` | Actualizar cliente        |
| `DELETE` | `/api/cliente/:id` | Eliminar cliente          |

### 📦 Pedidos

| Método   | Endpoint          | Descripción              |
| -------- | ----------------- | ------------------------ |
| `GET`    | `/api/pedido`     | Listar todos los pedidos |
| `GET`    | `/api/pedido/:id` | Obtener pedido por ID    |
| `POST`   | `/api/pedido`     | Crear nuevo pedido       |
| `PUT`    | `/api/pedido/:id` | Actualizar pedido        |
| `DELETE` | `/api/pedido/:id` | Eliminar pedido          |

### 💳 Pagos

| Método | Endpoint        | Descripción            |
| ------ | --------------- | ---------------------- |
| `GET`  | `/api/pago`     | Listar todos los pagos |
| `GET`  | `/api/pago/:id` | Obtener pago por ID    |
| `POST` | `/api/pago`     | Procesar nuevo pago    |
| `PUT`  | `/api/pago/:id` | Actualizar pago        |

## 🧪 Testing

```bash
# Ejecutar tests unitarios
npm run test

# Ejecutar tests con coverage
npm run test:cov

# Ejecutar tests e2e
npm run test:e2e

# Ejecutar tests en modo watch
npm run test:watch
```

## 📋 Ejemplos de Uso

### Crear un Producto

```bash
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Pizza Margherita",
    "descripcion": "Pizza clásica con mozzarella y albahaca",
    "precio": 15.99,
    "stock": 50,
    "categoria": 1,
    "mercadoPagoLink": "https://mpago.la/1kWHaXm"
  }'
```

### Crear un Pedido

```bash
curl -X POST http://localhost:3000/api/pedido \
  -H "Content-Type: application/json" \
  -d '{
    "cliente": 1,
    "cadete": 2,
    "observacion": "Sin cebolla, por favor"
  }'
```

### Respuesta Típica

```json
{
  "success": true,
  "data": {
    "id": 1,
    "cliente": {
      "id": 1,
      "nombre": "Juan",
      "apellido": "Pérez"
    },
    "cadete": {
      "id": 2,
      "nombre": "Carlos García"
    },
    "total": 0,
    "estado": "PENDIENTE",
    "observacion": "Sin cebolla, por favor",
    "fecha": "2025-01-18T19:45:00.000Z"
  },
  "message": "Pedido realizado con éxito"
}
```

## 🛠️ Stack Tecnológico

### Backend

- **Framework**: NestJS 11.x
- **Lenguaje**: TypeScript 5.x
- **Runtime**: Node.js 18+

### Base de Datos

- **DBMS**: MySQL 8.0
- **ORM**: TypeORM 0.3.x

### Validación y Transformación

- **Validación**: class-validator
- **Transformación**: class-transformer

### Documentación

- **OpenAPI**: @nestjs/swagger
- **UI**: Swagger UI Express

### Email

- **Servicio**: @nestjs-modules/mailer
- **Plantillas**: Handlebars
- **Provider**: Mailtrap (desarrollo)

### Archivos

- **Upload**: Multer
- **Servicio**: Static Files (Express)

### Containerización

- **Container**: Docker
- **Orquestación**: Docker Compose

## ⚙️ Configuración Avanzada

### Variables de Entorno

Crear archivo `.env`:

```env
# Base de Datos
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=mysql
DB_DATABASE=delivery_db

# Aplicación
NODE_ENV=development
PORT=3000

# Email
MAILER_HOST=sandbox.smtp.mailtrap.io
MAILER_PORT=587
MAILER_USER=tu_usuario
MAILER_PASS=tu_password

# MercadoPago
MP_ACCESS_TOKEN=tu_access_token
```

### CORS y Seguridad

```typescript
// main.ts
app.enableCors({
  origin:
    process.env.NODE_ENV === 'production' ? ['https://tu-frontend.com'] : true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
```

## 📊 Monitoreo y Logs

### Health Checks

```bash
# Verificar estado de la aplicación
curl http://localhost:3000/api/health

# Verificar conexión a BD
curl http://localhost:3000/api/health/database
```

### Logs Estructurados

```typescript
// Implementar logging estructurado
import { Logger } from '@nestjs/common';

const logger = new Logger('ProductoService');
logger.log('Producto creado exitosamente', { productId: 123 });
logger.error('Error al crear producto', error.stack);
```

## 🚀 Deployment

### Docker Production

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/main"]
```

### Docker Compose Production

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
      - DB_HOST=db
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
      MYSQL_DATABASE: ${DB_DATABASE}
    volumes:
      - mysql_data:/var/lib/mysql
    restart: unless-stopped

volumes:
  mysql_data:
```

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run start:dev              # Iniciar en modo desarrollo
npm run format                 # Formatear código con Prettier
npm run lint                   # Ejecutar ESLint

# Build
npm run build                  # Compilar aplicación
npm run start:prod             # Ejecutar versión compilada

# Docker
docker-compose up -d           # Iniciar servicios
docker-compose down            # Detener servicios
docker-compose logs app        # Ver logs de la aplicación

# Base de datos
npm run migration:generate     # Generar migración
npm run migration:run          # Ejecutar migraciones
npm run schema:sync            # Sincronizar esquema (solo desarrollo)
```

## 📝 Contribución

1. Fork el proyecto
2. Crear rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### Estándares de Código

- Usar **TypeScript** estricto
- Seguir convenciones de **NestJS**
- Escribir **tests** para nuevas funcionalidades
- Documentar con **JSDoc**
- Usar **conventional commits**

## 🐛 Troubleshooting

### Problemas Comunes

#### Error de Conexión a MySQL

```bash
# Verificar que MySQL esté ejecutándose
docker-compose ps

# Ver logs de MySQL
docker-compose logs db
```

#### Puerto en Uso

```bash
# Cambiar puerto en main.ts o variable de entorno
const port = process.env.PORT || 3001;
await app.listen(port);
```

#### Problemas de CORS

```typescript
// Configurar CORS específico
app.enableCors({
  origin: ['http://localhost:3000', 'http://localhost:4200'],
  credentials: true,
});
```

## 📞 Soporte

- **Issues**: [GitHub Issues](https://github.com/GuillermoCruz27/Project-Delivery-Server/issues)
- **Documentación**: [Swagger UI](http://localhost:3000/api/docs)
- **Wiki**: [GitHub Wiki](https://github.com/GuillermoCruz27/Project-Delivery-Server/wiki)

## 👥 Equipo de Desarrollo

- **GuillermoCruz27** - Desarrollador Principal
- **Contribuidores** - Ver [Contributors](https://github.com/GuillermoCruz27/Project-Delivery-Server/contributors)

## 📄 Licencia

Este proyecto está bajo la licencia **UNLICENSED** - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- **NestJS Team** por el excelente framework
- **TypeORM Team** por el ORM robusto
- **MySQL** por la base de datos confiable
- **Docker** por la containerización

---

<p align="center">
  Desarrollado con ❤️ para la comunidad de delivery
</p>
