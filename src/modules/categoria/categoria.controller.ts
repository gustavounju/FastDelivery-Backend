import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoria' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombre: { type: 'string' },
      },
      required: ['nombre'],
    },
  })
  @ApiResponse({ status: 201, description: 'Categoria creada correctamente' })
  async create(@Body() dto: CreateCategoriaDto) {
    const nuevaCategoria = await this.categoriaService.create(dto);
    return {
      success: true,
      data: nuevaCategoria,
      message: 'Categoría creada correctamente',
    };
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos las categorias' })
  @ApiResponse({ status: 200, description: 'Listado de categorias obtenido correctamente' })
  async findAll() {
    const categorias = await this.categoriaService.findAll();
    return {
      success: true,
      data: categorias,
      message: 'Listado de categorías obtenido correctamente',
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoria por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Categoria obtenida correctamente' })
  @ApiResponse({ status: 404, description: 'Categoria no encontrada' })
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
  @ApiOperation({ summary: 'Actualizar una categoria' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombre: { type: 'string' },
      },
      required: ['nombre'],
    },
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Categoria actualizada correctamente' })
  async update(@Param('id') id: number, @Body() dto: UpdateCategoriaDto) {
    const categoriaActualizada = await this.categoriaService.update(+id, dto);
    return {
      success: true,
      data: categoriaActualizada,
      message: 'Categoría actualizada correctamente',
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoria por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Categoria eliminada correctamente' })
  async remove(@Param('id') id: string) {
    const categoriaEliminada = await this.categoriaService.remove(+id);
    return {
      success: true,
      data: categoriaEliminada,
      message: 'Categoría eliminada correctamente',
    };
  }
}