import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity'; // Importa tu entidad Categoria

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriasRepository: Repository<Categoria>,
  ) {}

  findAll(): Promise<Categoria[]> {
    return this.categoriasRepository.find();
  }

  async findOne(id: number): Promise<Categoria | null> {
    const categoria = await this.categoriasRepository.findOneBy({ id });
    if (!categoria) {
      throw new NotFoundException(`Categoría con ID "${id}" no encontrada.`);
    }
    return categoria;
  }

  async create(categoriaData: Partial<Categoria>): Promise<Categoria> {
    const categoria = this.categoriasRepository.create(categoriaData);
    return this.categoriasRepository.save(categoria);
  }

  async update(
    id: number,
    categoriaData: Partial<Categoria>,
  ): Promise<Categoria | null> {
    const result = await this.categoriasRepository.update(id, categoriaData);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Categoría con ID "${id}" no encontrada para actualizar.`,
      );
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.categoriasRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Categoría con ID "${id}" no encontrada para eliminar.`,
      );
    }
  }
}
