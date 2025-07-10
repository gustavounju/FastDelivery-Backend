import { Injectable } from '@nestjs/common';
import { Producto } from '../entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
  ) {}

  findAll(): Promise<Producto[]> {
    return this.productosRepository.find();
  }

  findOne(id: number): Promise<Producto | null> {
    return this.productosRepository.findOneBy({ id });
  }

  async create(productoData: Partial<Producto>): Promise<Producto> {
    const producto = this.productosRepository.create(productoData);
    return this.productosRepository.save(producto);
  }

  async update(
    id: number,
    productoData: Partial<Producto>,
  ): Promise<Producto | null> {
    await this.productosRepository.update(id, productoData);
    return this.productosRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.productosRepository.delete(id);
  }
}
