import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Cadete } from 'src/entities/cadete.entity';
import { Cliente } from 'src/entities/cliente.entity';
import { Producto } from 'src/entities/producto.entity';
import { Pedido } from 'src/entities/pedido.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido) private pedidoRepository: Repository<Pedido>,
    @InjectRepository(Producto) private productoRepository: Repository<Producto>,
    @InjectRepository(Cliente) private clienteRepository: Repository<Cliente>,
    @InjectRepository(Cadete) private cadeteRepository: Repository<Cadete>,
  ) {}

  async create(dto: CreatePedidoDto) {
    const producto = await this.productoRepository.findOneBy({ id: dto.producto });

    if (!producto) throw new NotFoundException('Producto no encontrado');

    const nuevoPedido = new Pedido();

    if (dto.cliente) {
      const cliente = await this.clienteRepository.findOneBy({ id: dto.cliente });
      if (!cliente) throw new NotFoundException('Cliente no encontrado');
      nuevoPedido.cliente = cliente;
    }
    if (dto.cadete) {
      const cadete = await this.cadeteRepository.findOneBy({ id: dto.cadete });
      if (!cadete) throw new NotFoundException('Cadete no encontrado');
      nuevoPedido.cadete = cadete;
    }
    nuevoPedido.producto = producto;
    nuevoPedido.cantidad = dto.cantidad;
    nuevoPedido.total = producto.precio;
    nuevoPedido.estado = 'PENDIENTE';
    if (dto.observacion !== undefined) nuevoPedido.observacion = dto.observacion;

    return this.pedidoRepository.save(nuevoPedido);
  }

  findAll() {
    return this.pedidoRepository.find({ relations: ['producto', 'cliente', 'cadete'] });
  }

  async findOne(id: number) {
    const pedido = await this.pedidoRepository.findOne({ where: { id }, 
                        relations: ['producto', 'cliente', 'cadete'] });
    if (!pedido) {
      throw new NotFoundException('Pedido no encontrado');
    }
    return pedido;
  }

  async update(id: number, dto: UpdatePedidoDto) {
    const pedido = await this.findOne(id);
    if (!pedido) throw new NotFoundException('Pedido no encontrado');

    if (dto.producto) {
      const producto = await this.productoRepository.findOneBy({ id: dto.producto });
      if (!producto) throw new NotFoundException('Producto no encontrado');
      pedido.producto = producto;
    }

    if (dto.cliente) {
      const cliente = await this.clienteRepository.findOneBy({ id: dto.cliente });
      if (!cliente) throw new NotFoundException('Cliente no encontrado');
      pedido.cliente = cliente;
    }

    if (dto.cadete) {
      const cadete = await this.cadeteRepository.findOneBy({ id: dto.cadete });
      if (!cadete) throw new NotFoundException('Cadete no encontrado');
      pedido.cadete = cadete;
    }

    if (dto.cantidad !== undefined) pedido.cantidad = dto.cantidad;
    if (dto.total !== undefined) pedido.total = pedido.producto.precio * pedido.cantidad;
    if (dto.estado) pedido.estado = dto.estado;
    if (dto.observacion !== undefined) pedido.observacion = dto.observacion;

    return this.pedidoRepository.save(pedido);
  }

  async remove(id: number) {
    const pedido = await this.findOne(id);
    if (!pedido) throw new NotFoundException('Pedido no encontrado.');
    if (pedido.estado == "PAGADO") throw new BadRequestException('No se puede eliminar un pedido pagado');
    return this.pedidoRepository.remove(pedido);
  }
}
