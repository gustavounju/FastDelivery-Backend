# Security Policy

## Supported Versions

Las siguientes versiones de FastDelivery API están actualmente soportadas con actualizaciones de seguridad:

| Version | Supported          |
| ------- | ------------------ |
| 0.0.x   | :white_check_mark: |

## Reporting a Vulnerability

La seguridad es una prioridad para FastDelivery API. Si descubres una vulnerabilidad de seguridad, por favor repórtala de manera responsable.

### Cómo reportar

1. **NO** abras un issue público para vulnerabilidades de seguridad
2. Envía un email a: **security@fastdelivery.com**
3. Incluye la siguiente información:
   - Descripción de la vulnerabilidad
   - Pasos para reproducirla
   - Versión afectada
   - Impacto potencial
   - Tu información de contacto

### Qué esperar

- **Confirmación**: Recibirás una confirmación dentro de 24 horas
- **Evaluación**: Evaluaremos la vulnerabilidad dentro de 7 días
- **Resolución**: Trabajaremos en una solución y te mantendremos informado
- **Reconocimiento**: Si lo deseas, te acreditaremos en el fix

### Política de divulgación

- **90 días**: Tiempo máximo para resolver vulnerabilidades críticas
- **30 días**: Tiempo máximo para resolver vulnerabilidades de alta severidad
- **Coordinada**: Publicaremos información después del fix

## Security Best Practices

### Para Desarrolladores

1. **Validación de entrada**

   ```typescript
   @IsString()
   @Length(1, 100)
   @Matches(/^[a-zA-Z0-9\s]+$/) // Solo alfanuméricos
   nombre: string;
   ```

2. **Sanitización de datos**

   ```typescript
   import { Transform } from 'class-transformer';
   import * as sanitizeHtml from 'sanitize-html';

   @Transform(({ value }) => sanitizeHtml(value))
   descripcion: string;
   ```

3. **Rate limiting**
   ```typescript
   @UseGuards(ThrottlerGuard)
   @Throttle(10, 60) // 10 requests per minute
   async create(@Body() dto: CreateProductoDto) {
     // ...
   }
   ```

### Para Despliegue

1. **Variables de entorno**

   - Nunca hardcodees credenciales
   - Usa .env para configuración local
   - Usa secrets manager en producción

2. **HTTPS obligatorio**

   ```typescript
   app.use(helmet());
   app.use(compression());
   ```

3. **Headers de seguridad**
   ```typescript
   app.use(
     helmet({
       contentSecurityPolicy: {
         directives: {
           defaultSrc: ["'self'"],
           styleSrc: ["'self'", "'unsafe-inline'"],
         },
       },
     }),
   );
   ```

## Known Issues

Actualmente no hay vulnerabilidades conocidas reportadas.

## Contact

Para asuntos de seguridad:

- Email: security@fastdelivery.com
- GPG Key: [Disponible próximamente]
