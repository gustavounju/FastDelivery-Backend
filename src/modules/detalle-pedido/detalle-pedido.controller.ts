import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { DetallePedidoService } from './detalle-pedido.service';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto';
import { UpdateDetallePedidoDto } from './dto/update-detalle-pedido.dto';

@Controller('pedido/:pedidoId/detalles')
export class DetallePedidoController {
  constructor(private readonly detallePedidoService: DetallePedidoService) {}

  @Post()
  async create(@Param('pedidoId', ParseIntPipe) pedidoId: number,@Body() dto: CreateDetallePedidoDto) {
    const data = await this.detallePedidoService.create(pedidoId,dto);
    return { success: true, data, message: 'Producto agregado al pedido con éxito' };
  }

  @Get()
  async findAll(@Param('pedidoId', ParseIntPipe) pedidoId: number) {
    const data = await this.detallePedidoService.findByPedido(pedidoId);
    return { success: true, data, message: 'Productos del pedido obtenidos correctamente' };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.detallePedidoService.findOne(id);
    return { success: true, data, message: 'Producto del pedido obtenido correctamente' };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateDetallePedidoDto) {
    const data = await this.detallePedidoService.update(id, dto);
    return { success: true, data, message: 'Procuto del pedido actualizado correctamente' };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const data = await this.detallePedidoService.remove(id);
    return { success: true, data, message: 'Producto del pedido eliminado correctamente' };
  }
}
