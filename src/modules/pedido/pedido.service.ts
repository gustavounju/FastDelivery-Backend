import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pago } from 'src/entities/pago.entity';
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
    @InjectRepository(Pago) private pagoRepository: Repository<Pago>,
  ) {}

  async create(dto: CreatePedidoDto) {
    const producto = await this.productoRepository.findOneBy({ id: dto.producto });
    const cliente = await this.clienteRepository.findOneBy({ id: dto.cliente });
    const cadete = await this.cadeteRepository.findOneBy({ id: dto.cadete });

    if (!producto || !cliente) throw new NotFoundException('Producto o Cliente no encontrado');
    if (!cadete) throw new NotFoundException('Cadete no encontrado');

    const nuevoPedido = new Pedido();
    nuevoPedido.producto = producto;
    nuevoPedido.cliente = cliente;
    nuevoPedido.cadete = cadete;
    nuevoPedido.cantidad = dto.cantidad;
    nuevoPedido.total = dto.total;
    nuevoPedido.fecha = dto.fecha;
    nuevoPedido.estado = 'PENDIENTE';
    nuevoPedido.observacion = dto.observacion;

    return this.pedidoRepository.save(nuevoPedido);
  }

  findAll() {
    return this.pedidoRepository.find({ relations: ['producto', 'cliente', 'cadete', 'pago'] });
  }

  findOne(id: number) {
    const pedido = this.pedidoRepository.findOne({ where: { id }, 
                        relations: ['producto', 'cliente', 'cadete', 'pago'] });
    if (!pedido) {
      throw new NotFoundException('Pedido no encontrado');
    }
    return pedido;
  }

  async update(id: number, dto: UpdatePedidoDto) {
    const pedido = await this.findOne(id);
    if (!pedido) throw new NotFoundException('Pedido no encontrado');

    const producto = await this.productoRepository.findOneBy({ id: dto.producto });
    const cliente = await this.clienteRepository.findOneBy({ id: dto.cliente });
    const cadete = await this.cadeteRepository.findOneBy({ id: dto.cadete });

    Object.assign(pedido, {
      producto,
      cliente,
      cadete,
      cantidad: dto.cantidad,
      total: dto.total,
      fecha: dto.fecha,
      estado: dto.estado,
      observacion: dto.observacion
    });

    return this.pedidoRepository.save(pedido);
  }

  async remove(id: number) {
    const pedido = await this.findOne(id);
    if (!pedido) throw new NotFoundException('Pedido no encontrado.');
    return this.pedidoRepository.remove(pedido);
  }

  // Asociar un pago existente a un pedido
  async asignarPago(pedidoId: number, pagoId: number) {
    const pedido = await this.pedidoRepository.findOneBy({ id: pedidoId });
    const pago = await this.pagoRepository.findOneBy({ id: pagoId });

    if (!pedido || !pago) throw new NotFoundException('Pedido o pago no encontrado');
    pedido.pago = pago;

    return this.pedidoRepository.save(pedido);
  }
}
