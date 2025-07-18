# Guía de Contribución

¡Gracias por tu interés en contribuir a FastDelivery API! Este documento te guiará a través del proceso de contribución.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo Contribuir?](#cómo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Estándares de Código](#estándares-de-código)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Reportar Bugs](#reportar-bugs)
- [Solicitar Features](#solicitar-features)

## 🤝 Código de Conducta

Este proyecto se adhiere al código de conducta de la comunidad. Al participar, se espera que mantengas este código.

### Nuestros Valores

- **Respeto**: Trata a todos con respeto y consideración
- **Inclusión**: Fomenta un ambiente acogedor para todos
- **Colaboración**: Trabaja en conjunto para lograr objetivos comunes
- **Transparencia**: Comunica abierta y honestamente

## 🚀 ¿Cómo Contribuir?

### Tipos de Contribuciones

1. **🐛 Reportar bugs**
2. **✨ Proponer nuevas funcionalidades**
3. **📝 Mejorar documentación**
4. **🔧 Corregir código**
5. **🧪 Agregar tests**
6. **🎨 Mejorar UI/UX**

### Flujo de Trabajo

1. **Fork** el repositorio
2. **Clone** tu fork localmente
3. **Crea** una nueva rama para tu feature/fix
4. **Desarrolla** tu contribución
5. **Testea** tus cambios
6. **Commit** siguiendo las convenciones
7. **Push** a tu fork
8. **Crea** un Pull Request

## ⚙️ Configuración del Entorno

### Prerrequisitos

- Node.js >= 18.0.0
- npm >= 8.0.0
- MySQL >= 8.0
- Docker (opcional)
- Git

### Setup Paso a Paso

1. **Clonar el repositorio**

```bash
git clone https://github.com/TU_USUARIO/Project-Delivery-Server.git
cd Project-Delivery-Server
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar base de datos**

```bash
# Usando Docker (recomendado)
cd docker-compose
docker-compose up -d

# O configurar MySQL local
mysql -u root -p
CREATE DATABASE delivery_db;
```

4. **Configurar variables de entorno**

```bash
# Crear archivo .env
cp .env.example .env
# Editar con tus credenciales
```

5. **Ejecutar la aplicación**

```bash
npm run start:dev
```

6. **Verificar que funciona**

```bash
curl http://localhost:3000/api/docs
```

## 📏 Estándares de Código

### Convenciones de Naming

```typescript
// Clases: PascalCase
export class ProductoService {}

// Interfaces: PascalCase con prefijo I
export interface IProducto {}

// Variables y funciones: camelCase
const totalPrice = 100;
const calculateTotal = () => {};

// Constantes: UPPER_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3;

// Archivos: kebab-case
// producto.service.ts
// create-producto.dto.ts
```

### Estructura de Archivos

```
src/
├── modules/
│   └── producto/
│       ├── dto/
│       │   ├── create-producto.dto.ts
│       │   └── update-producto.dto.ts
│       ├── producto.controller.ts
│       ├── producto.service.ts
│       ├── producto.module.ts
│       └── producto.controller.spec.ts
```

### Convenciones de TypeScript

```typescript
// ✅ Usar tipos explícitos
function createProduct(data: CreateProductoDto): Promise<Producto> {
  return this.productoRepository.save(data);
}

// ✅ Usar interfaces para objetos complejos
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// ✅ Usar enums para constantes
enum PedidoEstado {
  PENDIENTE = 'PENDIENTE',
  EN_PROCESO = 'EN_PROCESO',
  ENTREGADO = 'ENTREGADO',
}
```

### Validaciones con class-validator

```typescript
export class CreateProductoDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  nombre: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  descripcion?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  precio: number;
}
```

### Documentación con Swagger

```typescript
@ApiTags('productos')
@Controller('productos')
export class ProductoController {
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Post()
  async create(@Body() dto: CreateProductoDto) {
    // implementation
  }
}
```

## 🧪 Testing

### Estructura de Tests

```typescript
describe('ProductoService', () => {
  let service: ProductoService;
  let mockRepository: jest.Mocked<Repository<Producto>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductoService,
        {
          provide: getRepositoryToken(Producto),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<ProductoService>(ProductoService);
    mockRepository = module.get(getRepositoryToken(Producto));
  });

  describe('create', () => {
    it('should create a product successfully', async () => {
      // Arrange
      const dto: CreateProductoDto = {
        nombre: 'Test Product',
        precio: 10.99,
        stock: 100,
        categoria: 1,
      };

      // Act
      const result = await service.create(dto);

      // Assert
      expect(result).toBeDefined();
      expect(mockRepository.save).toHaveBeenCalledWith(dto);
    });
  });
});
```

### Comandos de Testing

```bash
# Ejecutar todos los tests
npm run test

# Tests en modo watch
npm run test:watch

# Tests con coverage
npm run test:cov

# Tests e2e
npm run test:e2e
```

## 🔄 Proceso de Pull Request

### Antes de Crear un PR

1. **Actualiza tu fork**

```bash
git checkout develop
git pull upstream develop
git push origin develop
```

2. **Crea una rama descriptiva**

```bash
git checkout -b feature/add-product-categories
# o
git checkout -b fix/product-validation-bug
```

3. **Haz tus cambios**

```bash
# Desarrolla tu feature/fix
# Escribe tests
# Actualiza documentación si es necesario
```

4. **Verifica que todo funciona**

```bash
npm run lint
npm run test
npm run build
```

### Crear el Pull Request

1. **Commit con mensaje descriptivo**

```bash
git add .
git commit -m "feat: add product categories functionality

- Add category entity and module
- Implement CRUD operations for categories
- Add validation for category names
- Update product entity to include category relation

Closes #123"
```

2. **Push a tu fork**

```bash
git push origin feature/add-product-categories
```

3. **Crear PR en GitHub**

- Usa la plantilla de PR
- Describe claramente los cambios
- Referencia issues relacionados
- Agrega screenshots si aplica

### Plantilla de Pull Request

```markdown
## 📝 Descripción

Breve descripción de los cambios realizados.

## 🔧 Tipo de Cambio

- [ ] Bug fix (cambio que corrige un issue)
- [ ] Nueva funcionalidad (cambio que agrega funcionalidad)
- [ ] Breaking change (cambio que podría romper funcionalidad existente)
- [ ] Documentación (cambios solo en documentación)

## ✅ Testing

- [ ] Tests unitarios agregados/actualizados
- [ ] Tests e2e agregados/actualizados
- [ ] Todos los tests pasan

## 📋 Checklist

- [ ] Mi código sigue las convenciones del proyecto
- [ ] He realizado self-review de mi código
- [ ] He agregado comentarios en áreas complejas
- [ ] He actualizado la documentación si es necesario
- [ ] Mis cambios no generan nuevos warnings
```

## 🐛 Reportar Bugs

### Antes de Reportar

1. **Busca** si el bug ya fue reportado
2. **Verifica** que estés usando la versión más reciente
3. **Reproduce** el bug en un ambiente limpio

### Template para Bug Report

```markdown
## 🐛 Descripción del Bug

Descripción clara y concisa del bug.

## 🔄 Pasos para Reproducir

1. Ir a '...'
2. Hacer click en '...'
3. Scroll hasta '...'
4. Ver error

## ✅ Comportamiento Esperado

Descripción de lo que esperabas que pasara.

## 📱 Capturas de Pantalla

Si aplica, agregar capturas de pantalla.

## 🖥️ Entorno

- OS: [e.g. Windows 11]
- Node.js: [e.g. 18.17.0]
- npm: [e.g. 9.6.7]
- Versión del proyecto: [e.g. 0.0.1]

## 📄 Logs
```

Pegar logs relevantes aquí

```

## 📝 Contexto Adicional

Cualquier información adicional sobre el problema.
```

## ✨ Solicitar Features

### Template para Feature Request

```markdown
## 🚀 Feature Request

### ✨ Descripción de la Funcionalidad

Descripción clara de lo que quieres que se agregue.

### 🎯 Problema que Resuelve

Explica qué problema resuelve esta funcionalidad.

### 💡 Solución Propuesta

Describe cómo te imaginas que debería funcionar.

### 🔄 Alternativas Consideradas

Describe alternativas que hayas considerado.

### 📋 Criterios de Aceptación

- [ ] Criterio 1
- [ ] Criterio 2
- [ ] Criterio 3
```

## 🏷️ Convenciones de Commit

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Nuevas funcionalidades
git commit -m "feat: add user authentication"

# Corrección de bugs
git commit -m "fix: resolve product validation issue"

# Documentación
git commit -m "docs: update API documentation"

# Refactoring
git commit -m "refactor: optimize product service"

# Tests
git commit -m "test: add unit tests for product service"

# Cambios en build/CI
git commit -m "ci: update Docker configuration"
```

### Tipos de Commit

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Documentación
- `style`: Formato (no afecta funcionamiento)
- `refactor`: Refactoring de código
- `test`: Agregar/modificar tests
- `ci`: Cambios en CI/CD
- `perf`: Mejoras de performance
- `chore`: Tareas de mantenimiento

## 📞 Obtener Ayuda

Si necesitas ayuda:

1. **Lee** la documentación
2. **Busca** en issues existentes
3. **Pregunta** en nuestro Discord: [Link del Discord]
4. **Crea** un issue con la etiqueta `question`

## 🙏 Reconocimientos

Agradecemos a todos los contribuidores que han ayudado a hacer este proyecto mejor:

- [@GuillermoCruz27](https://github.com/GuillermoCruz27) - Creador y mantenedor principal

¡Tu contribución también aparecerá aquí! 🎉

---

**¡Gracias por contribuir a FastDelivery API!** 🚚✨
