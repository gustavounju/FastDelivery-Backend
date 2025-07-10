import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  async create(@Body() dto: CreateProductoDto) {
    const nuevoProducto = await this.productoService.create(dto);
    return {
      success: true,
      data: nuevoProducto,
      message: 'Producto creado correctamente',
    };
  }

  @Get()
  async findAll() {
    const productos = await this.productoService.findAll();
    return {
      success: true,
      data: productos,
      message: 'Listado de productos obtenido correctamente',
    };
  }

  @Get(':id')
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
  async update(@Param('id') id: string, @Body() dto: UpdateProductoDto) {
    const productoActualizado = await this.productoService.update(+id, dto);
    return {
      success: true,
      data: productoActualizado,
      message: 'Producto actualizado correctamente',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const productoEliminado = await this.productoService.remove(+id);
    return {
      success: true,
      data: productoEliminado,
      message: 'Producto eliminado correctamente',
    };
  }
}