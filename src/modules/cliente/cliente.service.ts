import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/entities/cliente.entity';
import { Repository } from 'typeorm';
import { Pedido } from 'src/entities/pedido.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  create(dto: CreateClienteDto) {
    /*
    const emailExistente = await this.clienteRepo.findOneBy({ email: dto.email });
    if (emailExistente) {
      throw new BadRequestException('El email ya está registrado');
    }*/
    const nuevo = this.clienteRepository.create(dto);
    return this.clienteRepository.save(nuevo);
  }

  findAll() {
    return this.clienteRepository.find();
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepository.findOneBy({ id });
    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado');
    }
    return cliente;
  }

  async update(id: number, dto: UpdateClienteDto) {
    const cliente = await this.findOne(id);
    if (!cliente) throw new NotFoundException('Cliente no encontrado');
    Object.assign(cliente, dto);
    return this.clienteRepository.save(cliente);
  }

  async remove(id: number) {
    const cliente = await this.findOne(id);
    if (!cliente) throw new NotFoundException('Cliente no encontrado');
    const pedidos = await this.clienteRepository.manager.find(Pedido, {
      where: { cliente: { id } },
    });
    if (pedidos.length > 0) {
      throw new BadRequestException('No se puede eliminar un cliente con pedidos asociados');
    }
    return this.clienteRepository.remove(cliente);
  }
}
