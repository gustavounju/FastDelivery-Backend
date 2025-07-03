import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../../entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Categoria } from 'src/entities/categoria.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,

    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>
  ) {}

  async create(dto: CreateProductoDto) {
    const categoria = await this.categoriaRepository.findOneBy({ id: dto.categoria });
    if (!categoria) {
      throw new NotFoundException('Categoría no encontrada');
    }

    const nuevoProducto = this.productoRepository.create({
      ...dto,
      categoria
    });

    return this.productoRepository.save(nuevoProducto);
  }

  findAll() {
    return this.productoRepository.find({ relations: ['categoria'] });
  }

  findOne(id: number) {
    return this.productoRepository.findOne({
      where: { id },
      relations: ['categoria']
    });
  }

  async update(id: number, dto: UpdateProductoDto) {
    const producto = await this.findOne(id);
    if (!producto) throw new NotFoundException('Producto no encontrado');

    let categoria = producto.categoria;

    if (dto.categoria) {
      const encontrada = await this.categoriaRepository.findOneBy({ id: dto.categoria });
      if (!encontrada) {
        throw new NotFoundException('Categoría no encontrada');
      }
      categoria = encontrada;
    }

    const productoActualizado = this.productoRepository.create({
      ...producto,
      ...dto,
      categoria,
    });

    return this.productoRepository.save(productoActualizado);
  }


  async remove(id: number) {
    const producto = await this.findOne(id);
    if (!producto) throw new NotFoundException('Producto no encontrado.');
    return this.productoRepository.delete(id);
  }
}