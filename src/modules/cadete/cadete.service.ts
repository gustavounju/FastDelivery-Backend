import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCadeteDto } from './dto/create-cadete.dto';
import { UpdateCadeteDto } from './dto/update-cadete.dto';
import { Cadete } from 'src/entities/cadete.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CadeteService {
  constructor(
    @InjectRepository(Cadete)
    private cadeteRepository: Repository<Cadete>,
  ) {}

  create(dto: CreateCadeteDto) {
    return this.cadeteRepository.save(dto);
  }

  findAll() {
    return this.cadeteRepository.find();
  }

  async findOne(id: number) {
    const cadete = await this.cadeteRepository.findOneBy({ id });
    if (!cadete) {
      throw new NotFoundException('Cadete no encontrado');
    }
    return cadete;
  }

  async update(id: number, dto: UpdateCadeteDto) {
    const cadete = await this.findOne(id);
    if (!cadete) throw new NotFoundException('Cadete no encontrado');
    Object.assign(cadete, dto);
    return this.cadeteRepository.save(cadete);
  }

  async remove(id: number) {
    const cadete = await this.findOne(id);
    if (!cadete) throw new NotFoundException('Cadete no encontrado');
    return this.cadeteRepository.remove(cadete);
  }
}
