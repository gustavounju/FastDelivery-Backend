import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from '../../entities/categoria.entity';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  create(dto: CreateCategoriaDto) {
    return this.categoriaRepository.save(dto);
  }

  findAll() {
    return this.categoriaRepository.find();
  }

  findOne(id: number) {
    return this.categoriaRepository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateCategoriaDto) {
    const categoria = await this.findOne(id);
    if (!categoria) throw new NotFoundException('Categoría no encontrada');
    return this.categoriaRepository.update(id, dto);
  }

  async remove(id: number) {
    const categoria = await this.findOne(id);
    if (!categoria) throw new NotFoundException('Categoría no encontrada');
    return this.categoriaRepository.delete(id);
  }
}