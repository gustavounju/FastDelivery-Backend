import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PagoService } from './pago.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';

@Controller('pago')
export class PagoController {
  constructor(private readonly pagoService: PagoService) {}

  @Post()
  async create(@Body() dto: CreatePagoDto) {
    const data = await this.pagoService.create(dto);
    return { success: true, data, message: 'Pago realizado con éxito' };
  }

  @Get()
  async findAll() {
    const data = await this.pagoService.findAll();
    return { success: true, data, message: 'Pagos obtenidos correctamente' };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.pagoService.findOne(id);
    return { success: true, data, message: 'Pago obtenido correctamente' };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body()dto: UpdatePagoDto) {
    const data = await this.pagoService.update(id, dto);
    return { success: true, data, message: 'Pago actualizado correctamente' };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const data = await this.pagoService.remove(id);
    return { success: true, data, message: 'Pago eliminado correctamente' };
  }
}
