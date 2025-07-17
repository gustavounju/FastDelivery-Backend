import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { DetallePedidoService } from './detalle-pedido.service';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto';
import { UpdateDetallePedidoDto } from './dto/update-detalle-pedido.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('pedido/:pedidoId/detalles')
export class DetallePedidoController {
  constructor(private readonly detallePedidoService: DetallePedidoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo detalle de pedido' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        producto: { type: 'number' },
        cantidad: { type: 'number' },
      },
      required: ['producto', 'cantidad'],
    },
  })
  @ApiResponse({ status: 201, description: 'Detalle de pedido creado correctamente' })
  async create(@Param('pedidoId', ParseIntPipe) pedidoId: number,@Body() dto: CreateDetallePedidoDto) {
    const data = await this.detallePedidoService.create(pedidoId,dto);
    return { success: true, data, message: 'Producto agregado al pedido con éxito' };
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos de un pedido' })
  @ApiResponse({ status: 200, description: 'Listado de productos de un pedido obtenido correctamente' })
  async findAll(@Param('pedidoId', ParseIntPipe) pedidoId: number) {
    const data = await this.detallePedidoService.findByPedido(pedidoId);
    return { success: true, data, message: 'Productos del pedido obtenidos correctamente' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un detalle de pedido por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Detalle de pedido obtenido correctamente' })
  @ApiResponse({ status: 404, description: 'Detalle de pedido no encontrado' })
  async findOne(@Param('id') id: number) {
    const data = await this.detallePedidoService.findOne(id);
    return { success: true, data, message: 'Producto del pedido obtenido correctamente' };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un detalle de pedido' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        cantidad: { type: 'number' },
      },
      required: ['cantidad'],
    },
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Detalle de pedido actualizado correctamente' })
  async update(@Param('id') id: number, @Body() dto: UpdateDetallePedidoDto) {
    const data = await this.detallePedidoService.update(id, dto);
    return { success: true, data, message: 'Procuto del pedido actualizado correctamente' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto de un pedido por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Producto del pedido eliminado correctamente' })
  async remove(@Param('id') id: number) {
    const data = await this.detallePedidoService.remove(id);
    return { success: true, data, message: 'Producto del pedido eliminado correctamente' };
  }
}
