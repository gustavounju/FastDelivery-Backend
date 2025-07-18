import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, UseInterceptors, UploadedFile, Query, BadRequestException } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';
import { CategoriaIdsDto } from './dto/categoria-ids.dto';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombre: { type: 'string' },
        descripcion: { type: 'string'},
        categoria: { type: 'number'},
        precio: { type: 'number' },
        stock: { type: 'number' },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['nombre', 'categoria', 'precio','stock'],
    },
  })
  @ApiResponse({ status: 201, description: 'Producto creado correctamente' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `product-${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async create(@UploadedFile() file: Express.Multer.File,@Body() dto: CreateProductoDto) {
    file ? dto.imagen_nombre = file.filename : null;
    const nuevoProducto = await this.productoService.create(dto);
    return {
      success: true,
      data: nuevoProducto,
      message: 'Producto creado correctamente',
    };
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, description: 'Listado de productos obtenido correctamente' })
  async findAll() {
    const productos = await this.productoService.findAll();
    return {
      success: true,
      data: productos,
      message: 'Listado de productos obtenido correctamente',
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Producto obtenido correctamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async findOne(@Param('id') id: string) {
    const producto = await this.productoService.findOne(+id);
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }
    return {
      success: true,
      data: producto,
      message: 'Producto obtenido correctamente',
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un producto' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombre: { type: 'string' },
        descripcion: { type: 'string'},
        categoria: { type: 'number'},
        precio: { type: 'number' },
        stock: { type: 'number' },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['nombre', 'categoria', 'precio','stock'],
    },
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Producto actualizado correctamente' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `product-${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async update(@Param('id') id: string, @UploadedFile() file: Express.Multer.File,
              @Body() dto: UpdateProductoDto) {
    if (file) {
      dto.imagen_nombre = file.filename; // asignar el nombre del archivo si llega uno nuevo
    }
    const productoActualizado = await this.productoService.update(+id, dto);
    return {
      success: true,
      data: productoActualizado,
      message: 'Producto actualizado correctamente',
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Producto eliminado correctamente' })
  async remove(@Param('id') id: string) {
    const productoEliminado = await this.productoService.remove(+id);
    return {
      success: true,
      data: productoEliminado,
      message: 'Producto eliminado correctamente',
    };
  }

  @Get('categoria/:categoriaId')
  @ApiOperation({ summary: 'Obtener productos por categoría' })
  @ApiParam({ name: 'categoriaId', type: Number })
  @ApiResponse({ status: 200, description: 'Productos filtrados por categoría obtenidos correctamente' })
  async findByCategoria(@Param('categoriaId') categoriaId: string) {
    const productos = await this.productoService.findByCategoria(+categoriaId);
    return {
      success: true,
      data: productos,
      message: 'Productos filtrados por categoría obtenidos correctamente',
    };
  }

  @Post('filtrar/categorias')
  @ApiOperation({ summary: 'Obtener productos filtrados por varias categorías' })
  @ApiResponse({ status: 200, description: 'Productos filtrados obtenidos correctamente' })
  async findByCategorias(@Body() body: CategoriaIdsDto) {
    if (!body?.categorias) {
      throw new BadRequestException('Debe enviar el campo "categorias"');
    }
    const productos = await this.productoService.findByCategorias(body.categorias);
    return {
      success: true,
      data: productos,
      message: 'Productos filtrados por categorías obtenidos correctamente',
    };
  }

  @Get('buscar/query')
  @ApiOperation({ summary: 'Buscar productos por nombre' })
  @ApiResponse({ status: 200, description: 'Productos encontrados correctamente' })
  async findByName(@Query('nombre') nombre: string) {
    if (!nombre) throw new BadRequestException('Nombre requerido');

    const productos = await this.productoService.findByName(nombre);
    return {
      success: true,
      data: productos,
      message: `Productos que coinciden con '${nombre}' obtenidos correctamente`,
    };
  }
}