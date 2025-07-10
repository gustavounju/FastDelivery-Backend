import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  async create(@Body() dto: CreateClienteDto) {
    const data = await this.clienteService.create(dto);
    return { success: true, data, message: 'Cliente creado correctamente' };
  }

  @Get()
  async findAll() {
    const data = await this.clienteService.findAll();
    return { success: true, data, message: 'Clientes obtenidos correctamente' };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.clienteService.findOne(id);
    return { success: true, data, message: 'Cliente obtenido correctamente' };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateClienteDto) {
    const data = await this.clienteService.update(id, dto);
    return { success: true, data, message: 'Cliente actualizado correctamente' };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const data = await this.clienteService.remove(id);
    return { success: true, data, message: 'Cliente eliminado correctamente' };
  }
}
