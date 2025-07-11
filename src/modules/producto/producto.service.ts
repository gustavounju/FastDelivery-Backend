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
    dto.imagen_nombre? dto.imagen_url =`/uploads/${dto.imagen_nombre}` : null;
    const nuevoProducto = this.productoRepository.create({
      ...dto,
      categoria
    });

    return this.productoRepository.save(nuevoProducto);
  }

  findAll() {
    return this.productoRepository.find({ relations: ['categoria'] });
  }

  async findOne(id: number) {
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: ['categoria']
    });
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }
    return producto;
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

    // Si llega imagen_nombre, actualizar también imagen_url
    if (dto.imagen_nombre) {
      dto.imagen_url = `/uploads/${dto.imagen_nombre}`;
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
    return this.productoRepository.remove(producto);
  }

  async findByCategoria(categoriaId: number) {
    const categoria = await this.categoriaRepository.findOneBy({ id: categoriaId });
    if (!categoria) {
      throw new NotFoundException('Categoría no encontrada');
    }

    return this.productoRepository.find({
      where: { categoria: { id: categoriaId } },
      relations: ['categoria'],
    });
  }
}