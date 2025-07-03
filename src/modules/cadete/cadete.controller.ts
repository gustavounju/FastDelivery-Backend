import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CadeteService } from './cadete.service';
import { CreateCadeteDto } from './dto/create-cadete.dto';
import { UpdateCadeteDto } from './dto/update-cadete.dto';

@Controller('cadete')
export class CadeteController {
  constructor(private readonly cadeteService: CadeteService) {}

  @Post()
  create(@Body() createCadeteDto: CreateCadeteDto) {
    return this.cadeteService.create(createCadeteDto);
  }

  @Get()
  findAll() {
    return this.cadeteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cadeteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCadeteDto: UpdateCadeteDto) {
    return this.cadeteService.update(+id, updateCadeteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cadeteService.remove(+id);
  }
}
