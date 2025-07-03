import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriaService } from './delivery.service.categoria';
import { Categoria } from '../entities/categoria.entity'; // Importa tu entidad Categoria

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Categoria | null> {
    return this.categoriaService.findOne(+id);
  }

  @Post()
  create(@Body() categoriaData: Partial<Categoria>): Promise<Categoria> {
    return this.categoriaService.create(categoriaData);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() categoriaData: Partial<Categoria>,
  ): Promise<Categoria | null> {
    return this.categoriaService.update(+id, categoriaData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriaService.remove(+id);
  }
}
