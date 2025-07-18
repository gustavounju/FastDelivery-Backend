# Documentación de la API

## Tabla de Contenidos

- [Introducción](#introducción)
- [Autenticación](#autenticación)
- [Formato de Respuesta](#formato-de-respuesta)
- [Códigos de Error](#códigos-de-error)
- [Endpoints](#endpoints)
- [Ejemplos de Uso](#ejemplos-de-uso)

## Introducción

La API de FastDelivery proporciona endpoints RESTful para gestionar un sistema completo de delivery. Todos los endpoints devuelven datos en formato JSON y siguen convenciones REST estándar.

**Base URL**: `http://localhost:3000/api`
**Documentación Interactiva**: `http://localhost:3000/api/docs`

## Autenticación

Actualmente la API no requiere autenticación. En futuras versiones se implementará JWT.

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

## Formato de Respuesta

Todas las respuestas siguen el siguiente formato estándar:

### Respuesta Exitosa

```json
{
  "success": true,
  "data": {
    // Datos solicitados
  },
  "message": "Descripción del resultado"
}
```

### Respuesta de Error

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Descripción del error",
    "details": {
      // Detalles adicionales del error
    }
  },
  "timestamp": "2025-01-18T19:30:00.000Z",
  "path": "/api/productos"
}
```

## Códigos de Error

| Código | Descripción                                |
| ------ | ------------------------------------------ |
| `400`  | Bad Request - Datos inválidos              |
| `404`  | Not Found - Recurso no encontrado          |
| `422`  | Unprocessable Entity - Error de validación |
| `500`  | Internal Server Error - Error interno      |

### Errores de Validación

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Error de validación",
    "details": {
      "nombre": ["El nombre es requerido"],
      "precio": ["El precio debe ser mayor a 0"]
    }
  }
}
```

## Endpoints

### 🛍️ Productos

#### Listar Productos

```http
GET /api/productos
```

**Query Parameters:**

- `categoria` (optional): ID de categoría para filtrar
- `page` (optional): Número de página (default: 1)
- `limit` (optional): Límite por página (default: 10)

**Respuesta:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Pizza Margherita",
      "descripcion": "Pizza clásica con mozzarella y albahaca",
      "precio": 15.99,
      "stock": 50,
      "imagen_url": "/uploads/pizza-margherita.jpg",
      "mercadoPagoLink": "https://mpago.la/1kWHaXm",
      "created_at": "2025-01-18T10:00:00.000Z",
      "categoria": {
        "id": 1,
        "nombre": "Pizzas"
      }
    }
  ],
  "message": "Productos obtenidos correctamente"
}
```

#### Obtener Producto por ID

```http
GET /api/productos/{id}
```

**Path Parameters:**

- `id` (required): ID del producto

#### Crear Producto

```http
POST /api/productos
```

**Body:**

```json
{
  "nombre": "Pizza Margherita",
  "descripcion": "Pizza clásica con mozzarella y albahaca",
  "precio": 15.99,
  "stock": 50,
  "categoria": 1,
  "mercadoPagoLink": "https://mpago.la/1kWHaXm"
}
```

#### Actualizar Producto

```http
PUT /api/productos/{id}
```

#### Eliminar Producto

```http
DELETE /api/productos/{id}
```

#### Subir Imagen de Producto

```http
POST /api/productos/upload
```

**Headers:**

```
Content-Type: multipart/form-data
```

**Body:**

```
file: [archivo de imagen]
```

### 📂 Categorías

#### Listar Categorías

```http
GET /api/categorias
```

**Respuesta:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Pizzas"
    },
    {
      "id": 2,
      "nombre": "Hamburguesas"
    }
  ],
  "message": "Listado de categorías obtenido correctamente"
}
```

#### Crear Categoría

```http
POST /api/categorias
```

**Body:**

```json
{
  "nombre": "Pizzas"
}
```

### 👤 Clientes

#### Listar Clientes

```http
GET /api/cliente
```

#### Crear Cliente

```http
POST /api/cliente
```

**Body:**

```json
{
  "dni": "12345678",
  "nombre": "Juan",
  "apellido": "Pérez",
  "direccion": "Av. Corrientes 1234",
  "telefono": "+54911234567",
  "email": "juan.perez@email.com"
}
```

### 📦 Pedidos

#### Listar Pedidos

```http
GET /api/pedido
```

**Respuesta:**

```json
{
  "success": true,
  "data": [
    {
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
      "total": 25.99,
      "estado": "PENDIENTE",
      "observacion": "Sin cebolla",
      "fecha": "2025-01-18T15:30:00.000Z"
    }
  ],
  "message": "Pedidos obtenidos correctamente"
}
```

#### Crear Pedido

```http
POST /api/pedido
```

**Body:**

```json
{
  "cliente": 1,
  "cadete": 2,
  "observacion": "Sin cebolla, por favor"
}
```

#### Estados de Pedido

- `PENDIENTE`: Pedido recibido, esperando procesamiento
- `EN_PROCESO`: Pedido siendo preparado
- `EN_CAMINO`: Pedido en ruta de entrega
- `ENTREGADO`: Pedido entregado al cliente
- `CANCELADO`: Pedido cancelado

### 🚴 Cadetes

#### Listar Cadetes

```http
GET /api/cadete
```

#### Crear Cadete

```http
POST /api/cadete
```

**Body:**

```json
{
  "nombre": "Carlos García"
}
```

### 💳 Pagos

#### Procesar Pago

```http
POST /api/pago
```

**Body:**

```json
{
  "pedido": 1,
  "total": 25.99,
  "estado": "PAGADO"
}
```

### 📄 Detalles de Pedido

#### Agregar Item a Pedido

```http
POST /api/detalle-pedido
```

**Body:**

```json
{
  "pedido": 1,
  "producto": 1,
  "cantidad": 2,
  "precio": 15.99
}
```

## Ejemplos de Uso

### Flujo Completo de Pedido

#### 1. Crear Cliente

```bash
curl -X POST http://localhost:3000/api/cliente \
  -H "Content-Type: application/json" \
  -d '{
    "dni": "12345678",
    "nombre": "Juan",
    "apellido": "Pérez",
    "direccion": "Av. Corrientes 1234",
    "email": "juan@email.com"
  }'
```

#### 2. Crear Pedido

```bash
curl -X POST http://localhost:3000/api/pedido \
  -H "Content-Type: application/json" \
  -d '{
    "cliente": 1,
    "observacion": "Sin cebolla"
  }'
```

#### 3. Agregar Productos al Pedido

```bash
curl -X POST http://localhost:3000/api/detalle-pedido \
  -H "Content-Type: application/json" \
  -d '{
    "pedido": 1,
    "producto": 1,
    "cantidad": 2,
    "precio": 15.99
  }'
```

#### 4. Procesar Pago

```bash
curl -X POST http://localhost:3000/api/pago \
  -H "Content-Type: application/json" \
  -d '{
    "pedido": 1,
    "total": 31.98,
    "estado": "PAGADO"
  }'
```

### Upload de Imagen

```bash
curl -X POST http://localhost:3000/api/productos/upload \
  -F "file=@/ruta/a/imagen.jpg"
```

### Filtrar Productos por Categoría

```bash
curl "http://localhost:3000/api/productos?categoria=1"
```

## Códigos de Ejemplo

### JavaScript/TypeScript

```typescript
// Crear un nuevo producto
const createProduct = async (productData) => {
  try {
    const response = await fetch('http://localhost:3000/api/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    const result = await response.json();

    if (result.success) {
      console.log('Producto creado:', result.data);
    } else {
      console.error('Error:', result.error);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
};

// Usar la función
createProduct({
  nombre: 'Pizza Margherita',
  precio: 15.99,
  stock: 50,
  categoria: 1,
});
```

### Python

```python
import requests

def create_product(product_data):
    url = 'http://localhost:3000/api/productos'

    try:
        response = requests.post(url, json=product_data)
        result = response.json()

        if result['success']:
            print('Producto creado:', result['data'])
        else:
            print('Error:', result['error'])

    except requests.exceptions.RequestException as e:
        print('Error de red:', e)

# Usar la función
create_product({
    'nombre': 'Pizza Margherita',
    'precio': 15.99,
    'stock': 50,
    'categoria': 1
})
```

## Rate Limiting

Actualmente no hay límites de tasa implementados. En futuras versiones:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1609459200
```

## Versionado

La API actualmente está en versión v1. Futuras versiones mantendrán compatibilidad hacia atrás.

## Soporte

Para soporte técnico:

- Documentación interactiva: http://localhost:3000/api/docs
- Issues: https://github.com/GuillermoCruz27/Project-Delivery-Server/issues
- Email: soporte@fastdelivery.com
