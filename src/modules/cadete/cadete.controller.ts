import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CadeteService } from './cadete.service';
import { CreateCadeteDto } from './dto/create-cadete.dto';
import { UpdateCadeteDto } from './dto/update-cadete.dto';

@Controller('cadete')
export class CadeteController {
  constructor(private readonly cadeteService: CadeteService) {}

  @Post()
  async create(@Body() dto: CreateCadeteDto) {
    const data = await this.cadeteService.create(dto);
    return { success: true, data, message: 'Cadete creado correctamente' };
  }

  @Get()
  async findAll() {
    const data = await this.cadeteService.findAll();
    return { success: true, data, message: 'Cadetes obtenidos correctamente' };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.cadeteService.findOne(id);
    return { success: true, data, message: 'Cadete obtenido correctamente' };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateCadeteDto) {
    const data = await this.cadeteService.update(id, dto);
    return { success: true, data, message: 'Cadete actualizado correctamente' };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const data = await this.cadeteService.remove(id);
    return { success: true, data, message: 'Cadete eliminado correctamente' };
  }
}
