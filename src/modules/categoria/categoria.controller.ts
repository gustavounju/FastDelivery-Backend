import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  async create(@Body() dto: CreateCategoriaDto) {
    const nuevaCategoria = await this.categoriaService.create(dto);
    return {
      success: true,
      data: nuevaCategoria,
      message: 'Categoría creada correctamente',
    };
  }

  @Get()
  async findAll() {
    const categorias = await this.categoriaService.findAll();
    return {
      success: true,
      data: categorias,
      message: 'Listado de categorías obtenido correctamente',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const categoria = await this.categoriaService.findOne(id);
    if (!categoria) {
      throw new NotFoundException('Categoría no encontrada');
    }
    return {
      success: true,
      data: categoria,
      message: 'Categoría obtenida correctamente',
    };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateCategoriaDto) {
    const categoriaActualizada = await this.categoriaService.update(+id, dto);
    return {
      success: true,
      data: categoriaActualizada,
      message: 'Categoría actualizada correctamente',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const categoriaEliminada = await this.categoriaService.remove(+id);
    return {
      success: true,
      data: categoriaEliminada,
      message: 'Categoría eliminada correctamente',
    };
  }
}