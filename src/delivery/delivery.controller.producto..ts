import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductoService } from './delivery.service.producto';
import { Producto } from '../entities/delivery.entity.producto';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productosService: ProductoService) {}

  @Get()
  findAll(): Promise<Producto[]> {
    return this.productosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Producto | null> {
    return this.productosService.findOne(+id);
  }

  @Post()
  create(@Body() productoData: Partial<Producto>): Promise<Producto> {
    return this.productosService.create(productoData);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() productoData: Partial<Producto>,
  ): Promise<Producto | null> {
    return this.productosService.update(+id, productoData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productosService.remove(+id);
  }
}
