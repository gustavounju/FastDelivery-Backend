import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { Repository } from 'typeorm';
import { Pago } from 'src/entities/pago.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from 'src/entities/pedido.entity';
import { PagoMailService } from './mail.service';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Pago) private pagoRepository: Repository<Pago>,
    @InjectRepository(Pedido) private pedidoRepository: Repository<Pedido>,
    private readonly pagoMailService: PagoMailService,
  ) {}

  async create(dto: CreatePagoDto) {
    const pedido = await this.pedidoRepository.findOne({
      where: { id: dto.pedido },relations: ['cliente']
    });

    if (!pedido) {
      throw new NotFoundException('Pedido no encontrado');
    }

    if (pedido.estado == "FINALIZADO" ) throw new BadRequestException('El pedido ya fue pagado');
    if (pedido.estado == "CANCELADO" ) throw new BadRequestException('El pedido fue cancelado');

    const pedidoPagado = await this.pagoRepository.findOne({
      where: { pedido: { id: dto.pedido }},
      relations: ["pedido"]
    });
    if (pedidoPagado) {
      throw new BadRequestException('El pedido ya tiene un pago asociado');
    }

    pedido.estado = "FINALIZADO";
    const pago = this.pagoRepository.create({
      total: pedido.total,
      estado: 'PAGADO',
      pedido: pedido
    });

    if (pedido.cliente?.email) {
      await this.pagoMailService.enviarConfirmacionPago(pedido.cliente, pago.total);
    }

    await this.pedidoRepository.save(pedido);
    return this.pagoRepository.save(pago);
  }

  findAll() {
    return this.pagoRepository.find({relations: ['pedido', 'pedido.cliente', 'pedido.cadete']});
  }

  async findOne(id: number) {
    const pago = await this.pagoRepository.findOne({ where: { id },
        relations: ['pedido', 'pedido.cliente', 'pedido.cadete'] });
    if (!pago) {
      throw new NotFoundException('Pago no encontrado');
    }
    return pago;
  }

  async update(id: number, dto: UpdatePagoDto) {
    const pago = await this.findOne(id);
    if (!pago) throw new NotFoundException('Pago no encontrado');
    if (pago.estado == "PAGADO") throw new BadRequestException('El pedido ya fue pagado');
    if (pago.pedido.estado == "CANCELADO" ) throw new BadRequestException('El pedido fue cancelado');
    Object.assign(pago, dto);
    return this.pagoRepository.save(pago);
  }

  async remove(id: number) {
    const pago = await this.findOne(id);
    if (!pago) throw new NotFoundException('Pago no encontrado');
    if (pago.estado == "PAGADO") throw new BadRequestException('No se puede eliminar un pago finalizado');
    return this.pagoRepository.remove(pago);
  }
}
