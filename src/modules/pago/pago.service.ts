import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { Repository } from 'typeorm';
import { Pago } from 'src/entities/pago.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Pago) private pagoRepository: Repository<Pago>,
  ) {}

  create(dto: CreatePagoDto) {
    const pago = this.pagoRepository.create(dto);
    return this.pagoRepository.save(pago);
  }

  findAll() {
    return this.pagoRepository.find();
  }

  async findOne(id: number) {
    const pago = await this.pagoRepository.findOneBy({ id });
    if (!pago) {
      throw new NotFoundException('Pago no encontrado');
    }
    return pago;
  }

  async update(id: number, dto: UpdatePagoDto) {
    const pago = await this.findOne(id);
    if (!pago) throw new NotFoundException('Pago no encontrado');
    Object.assign(pago, dto);
    return this.pagoRepository.save(pago);
  }

  async remove(id: number) {
    const pago = await this.findOne(id);
    if (!pago) throw new NotFoundException('Pago no encontrado');
    return this.pagoRepository.remove(pago);
  }
}
