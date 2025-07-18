import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Cadete } from 'src/entities/cadete.entity';
import { Cliente } from 'src/entities/cliente.entity';
import { Pedido } from 'src/entities/pedido.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from 'src/entities/producto.entity';
import { DetallePedido } from 'src/entities/detallePedido.entity';


@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido) private pedidoRepository: Repository<Pedido>,
    @InjectRepository(Cliente) private clienteRepository: Repository<Cliente>,
    @InjectRepository(Cadete) private cadeteRepository: Repository<Cadete>,
    @InjectRepository(Producto) private productoRepository: Repository<Producto>,
    @InjectRepository(DetallePedido) private detallePedidoRepository: Repository<DetallePedido>,
  ) {}

  async create(dto: CreatePedidoDto) {
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
    nuevoPedido.total = 0;
    nuevoPedido.estado = 'PENDIENTE';
    if (dto.observacion !== undefined) nuevoPedido.observacion = dto.observacion;

    return this.pedidoRepository.save(nuevoPedido);
  }

  findAll() {
    return this.pedidoRepository.find({ relations: ['cliente', 'cadete'] });
  }

  async findOne(id: number) {
    const pedido = await this.pedidoRepository.findOne({ where: { id }, 
                        relations: ['cliente', 'cadete'] });
    if (!pedido) {
      throw new NotFoundException('Pedido no encontrado');
    }
    return pedido;
  }

  async update(id: number, dto: UpdatePedidoDto) {
    const pedido = await this.findOne(id);
    if (!pedido) throw new NotFoundException('Pedido no encontrado');

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

    if (dto.total !== undefined) pedido.total = dto.total;
    if (dto.estado) pedido.estado = dto.estado;
    if (dto.observacion !== undefined) pedido.observacion = dto.observacion;

    return this.pedidoRepository.save(pedido);
  }

  async remove(id: number) {
    const pedido = await this.findOne(id);
    if (!pedido) throw new NotFoundException('Pedido no encontrado.');
    if (pedido.estado == "FINALIZADO") throw new BadRequestException('No se puede eliminar un pedido pagado');

    // Obtener detalles del pedido con su producto (si existen)
    const detalles = await this.detallePedidoRepository.find({
      where: { pedido: { id } },
    });

    if (detalles.length > 0) {
      const detallesConProducto = await this.detallePedidoRepository.find({
        where: { pedido: { id } },
        relations: ['producto'],
      });
      for (const detalle of detallesConProducto) {
        //Devolver los productos del pedido
        if (detalle.producto) {
          detalle.producto.stock += detalle.cantidad;
          await this.productoRepository.save(detalle.producto);
        }
      }
      await this.detallePedidoRepository.remove(detallesConProducto);
    }

    return this.pedidoRepository.remove(pedido);
  }
}
