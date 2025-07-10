import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto';
import { UpdateDetallePedidoDto } from './dto/update-detalle-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from 'src/entities/pedido.entity';
import { Producto } from 'src/entities/producto.entity';
import { Repository } from 'typeorm';
import { DetallePedido } from 'src/entities/detallePedido.entity';

@Injectable()
export class DetallePedidoService {
  constructor(
    @InjectRepository(DetallePedido) private detallePedidoRepository: Repository<DetallePedido>,
      @InjectRepository(Pedido) private pedidoRepository: Repository<Pedido>,
      @InjectRepository(Producto) private productoRepository: Repository<Producto>,
  ) {}

  async create(pedidoId: number,dto: CreateDetallePedidoDto) {
    const pedido = await this.pedidoRepository.findOneBy({ id: pedidoId});
    const producto = await this.productoRepository.findOneBy({ id: dto.producto });

    if (!pedido) throw new NotFoundException('Pedido no encontrado');
    if (!producto) throw new NotFoundException('Producto no encontrado');

    if (dto.cantidad > producto.stock) {
      throw new BadRequestException(`Stock insuficiente. Disponible: ${producto.stock}`);
    }

    let detalle = await this.detallePedidoRepository.findOne({
      where: {
        pedido: { id: pedidoId },
        producto: { id: dto.producto },
      },
      relations: ['producto', 'pedido'],
    });

    if (detalle) {
      // Ya existe, sumamos cantidad
      detalle.cantidad += dto.cantidad;
      detalle.precio = producto.precio;
      detalle.updated_at = new Date();
    } else {
      detalle = this.detallePedidoRepository.create({
        pedido,
        producto,
        cantidad: dto.cantidad,
        precio: producto.precio,
      });
    }

    const savedDetalle = await this.detallePedidoRepository.save(detalle);

    // Descontar stock
    producto.stock -= dto.cantidad;
    await this.productoRepository.save(producto);

    // Recalcular el total del pedido
    const detalles = await this.detallePedidoRepository.find({ where: { pedido: { id: pedidoId } } });
    const total = detalles.reduce((sum, d) => sum + d.precio * d.cantidad, 0);

    pedido.total = total;
    await this.pedidoRepository.save(pedido);

    return savedDetalle;
  }

  async findOne(id: number) {
    const detalle = await this.detallePedidoRepository.findOne({ where: { id }, 
                        relations: ['pedido', 'producto'] });
    if (!detalle) {
      throw new NotFoundException('Detalle del pedido no encontrado');
    }
    return detalle;
  }

  async findByPedido(pedidoId: number) {
    return this.detallePedidoRepository.find({ where: { pedido: { id: pedidoId } } });
  }

  async update(id: number, dto: UpdateDetallePedidoDto) {
    const detalle = await this.findOne(id);
    if (!detalle) throw new NotFoundException('Detalle de pedido no encontrado');

    const diferencia = dto.cantidad - detalle.cantidad;
    // Si la cantidad aumenta, verificar stock disponible
    if (diferencia > 0) {
      if (detalle.producto.stock < diferencia) {
        throw new BadRequestException(
          `Stock insuficiente. Disponible: ${detalle.producto.stock}`
        );
      }
      detalle.producto.stock -= diferencia;
    } else if (diferencia < 0) {
      // Si la cantidad disminuye, devolver stock
      detalle.producto.stock += Math.abs(diferencia);
    }

    await this.productoRepository.save(detalle.producto);

    detalle.cantidad = dto.cantidad ?? detalle.cantidad;

    await this.detallePedidoRepository.save(detalle);

    // Recalcular total del pedido
    const detalles = await this.detallePedidoRepository.find({
      where: { pedido: { id: detalle.pedido.id } },
    });

    const total = detalles.reduce((sum, d) => sum + d.precio * d.cantidad, 0);
    detalle.pedido.total = total;

    await this.pedidoRepository.save(detalle.pedido);

    return detalle;
  }

  async remove(id: number) {
    const detalle = await this.findOne(id);
    if (!detalle) throw new NotFoundException('Detalle de pedido no encontrado');

    // Restaurar stock
    detalle.producto.stock += detalle.cantidad;
    await this.productoRepository.save(detalle.producto);

    await this.detallePedidoRepository.remove(detalle);

    // Recalcular total del pedido
    const detalles = await this.detallePedidoRepository.find({
      where: { pedido: { id: detalle.pedido.id } },
    });

    const total = detalles.reduce((sum, d) => sum + d.precio * d.cantidad, 0);
    detalle.pedido.total = total;

    await this.pedidoRepository.save(detalle.pedido);

    return detalle;
  }
  /*
  private async recalcularTotalPedido(pedidoId: number) {
    const detalles = await this.detallePedidoRepository.find({
      where: { pedido: { id: pedidoId } },
    });

    const total = detalles.reduce((sum, d) => sum + d.precio * d.cantidad, 0);

    await this.pedidoRepository.update(pedidoId, { total });
  }*/
}
