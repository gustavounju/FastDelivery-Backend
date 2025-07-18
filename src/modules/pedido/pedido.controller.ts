import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo pedido' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        cliente: { type: 'number' },
        cadete: { type: 'number' },
        observacion: { type: 'string' },
      },
      required: [],
    },
  })
  @ApiResponse({ status: 201, description: 'Pedido creado correctamente' })
  async create(@Body() dto: CreatePedidoDto) {
    const data = await this.pedidoService.create(dto);
    return { success: true, data, message: 'Pedido realizado con éxito' };
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los pedidos' })
  @ApiResponse({ status: 200, description: 'Listado de pedidos obtenido correctamente' })
  async findAll() {
    const data = await this.pedidoService.findAll();
    return { success: true, data, message: 'Pedidos obtenidos correctamente' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un pedido por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Pedido obtenido correctamente' })
  @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
  async findOne(@Param('id') id: number) {
    const data = await this.pedidoService.findOne(id);
    return { success: true, data, message: 'Pedido obtenido correctamente' };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un pedido' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        cliente: { type: 'number' },
        cadete: { type: 'number' },
        observacion: { type: 'string' },
      },
      required: [],
    },
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Pedido actualizado correctamente' })
  async update(@Param('id') id: number, @Body() dto: UpdatePedidoDto) {
    const data = await this.pedidoService.update(id, dto);
    return { success: true, data, message: 'Pedido actualizado correctamente' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un pedido por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Pedido eliminado correctamente' })
  async remove(@Param('id') id: number) {
    const data = await this.pedidoService.remove(id);
    return { success: true, data, message: 'Pedido eliminado correctamente' };
  }
}
