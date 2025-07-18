import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        dni: { type: 'string' },
        nombre: { type: 'string' },
        apellido: { type: 'string' },
        direccion: { type: 'string' },
        telefono: { type: 'string' },
        email: { type: 'string' },
      },
      required: ['dni','nombre','apellido','direccion','telefono','email'],
    },
  })
  async create(@Body() dto: CreateClienteDto) {
    const data = await this.clienteService.create(dto);
    return { success: true, data, message: 'Cliente creado correctamente' };
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los clientes' })
  @ApiResponse({ status: 200, description: 'Listado de clientes obtenido correctamente' })
  async findAll() {
    const data = await this.clienteService.findAll();
    return { success: true, data, message: 'Clientes obtenidos correctamente' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Cliente obtenido correctamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async findOne(@Param('id') id: number) {
    const data = await this.clienteService.findOne(id);
    return { success: true, data, message: 'Cliente obtenido correctamente' };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un cliente' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        dni: { type: 'string' },
        nombre: { type: 'string' },
        apellido: { type: 'string' },
        direccion: { type: 'string' },
        telefono: { type: 'string' },
        email: { type: 'string' },
      },
      required: ['dni','nombre','apellido','direccion','telefono','email'],
    },
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Cliente actualizado correctamente' })
  async update(@Param('id') id: number, @Body() dto: UpdateClienteDto) {
    const data = await this.clienteService.update(id, dto);
    return { success: true, data, message: 'Cliente actualizado correctamente' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un cliente por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Cliente eliminado correctamente' })
  async remove(@Param('id') id: number) {
    const data = await this.clienteService.remove(id);
    return { success: true, data, message: 'Cliente eliminado correctamente' };
  }
}
