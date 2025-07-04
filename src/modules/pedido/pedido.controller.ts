import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async create(@Body() dto: CreatePedidoDto) {
    const data = await this.pedidoService.create(dto);
    return { success: true, data, message: 'Pedido realizado con éxito' };
  }

  @Get()
  async findAll() {
    const data = await this.pedidoService.findAll();
    return { success: true, data, message: 'Pedidos obtenidos correctamente' };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.pedidoService.findOne(id);
    return { success: true, data, message: 'Pedido obtenido correctamente' };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdatePedidoDto) {
    const data = await this.pedidoService.update(id, dto);
    return { success: true, data, message: 'Pedido actualizado correctamente' };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const data = await this.pedidoService.remove(id);
    return { success: true, data, message: 'Pedido eliminado correctamente' };
  }

  @Put(':id/pago/:pagoId')
  async asignarPago(@Param('id') id: number, @Param('pagoId') pagoId: number) {
    const data = await this.pedidoService.asignarPago(id, pagoId);
    return { success: true, data, message: 'Pago asignado al pedido' };
  }
}
