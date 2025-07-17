import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PagoService } from './pago.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('pago')
export class PagoController {
  constructor(private readonly pagoService: PagoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo pago' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        pedido: { type: 'number' },
      },
      required: ['pedido'],
    },
  })
  @ApiResponse({ status: 201, description: 'Pago realizado correctamente' })
  async create(@Body() dto: CreatePagoDto) {
    const data = await this.pagoService.create(dto);
    return { success: true, data, message: 'Pago realizado con éxito' };
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los pagos' })
  @ApiResponse({ status: 200, description: 'Listado de pagos obtenido correctamente' })
  async findAll() {
    const data = await this.pagoService.findAll();
    return { success: true, data, message: 'Pagos obtenidos correctamente' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un pago por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Pago obtenido correctamente' })
  @ApiResponse({ status: 404, description: 'Pago no encontrado' })
  async findOne(@Param('id') id: number) {
    const data = await this.pagoService.findOne(id);
    return { success: true, data, message: 'Pago obtenido correctamente' };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un pago' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        estado: { type: 'string' },
      },
      required: ['estado'],
    },
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Pago actualizado correctamente' })
  async update(@Param('id') id: number, @Body()dto: UpdatePagoDto) {
    const data = await this.pagoService.update(id, dto);
    return { success: true, data, message: 'Pago actualizado correctamente' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un pago por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Pago eliminado correctamente' })
  async remove(@Param('id') id: number) {
    const data = await this.pagoService.remove(id);
    return { success: true, data, message: 'Pago eliminado correctamente' };
  }
}
