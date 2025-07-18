import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CadeteService } from './cadete.service';
import { CreateCadeteDto } from './dto/create-cadete.dto';
import { UpdateCadeteDto } from './dto/update-cadete.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('cadete')
export class CadeteController {
  constructor(private readonly cadeteService: CadeteService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo cadete' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nombre: { type: 'string' },
      },
      required: ['nombre'],
    },
  })
  @ApiResponse({ status: 201, description: 'Cadete creado correctamente' })
  async create(@Body() dto: CreateCadeteDto) {
    const data = await this.cadeteService.create(dto);
    return { success: true, data, message: 'Cadete creado correctamente' };
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los cadetes' })
  @ApiResponse({ status: 200, description: 'Listado de cadetes obtenido correctamente' })
  async findAll() {
    const data = await this.cadeteService.findAll();
    return { success: true, data, message: 'Cadetes obtenidos correctamente' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cadete por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Cadete obtenido correctamente' })
  @ApiResponse({ status: 404, description: 'Cadete no encontrado' })
  async findOne(@Param('id') id: number) {
    const data = await this.cadeteService.findOne(id);
    return { success: true, data, message: 'Cadete obtenido correctamente' };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un cadete' })
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
  @ApiResponse({ status: 200, description: 'Cadete actualizado correctamente' })
  async update(@Param('id') id: number, @Body() dto: UpdateCadeteDto) {
    const data = await this.cadeteService.update(id, dto);
    return { success: true, data, message: 'Cadete actualizado correctamente' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un cadete por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Cadete eliminado correctamente' })
  async remove(@Param('id') id: number) {
    const data = await this.cadeteService.remove(id);
    return { success: true, data, message: 'Cadete eliminado correctamente' };
  }
}
