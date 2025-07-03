import { Injectable } from '@nestjs/common';
import { CreateCadeteDto } from './dto/create-cadete.dto';
import { UpdateCadeteDto } from './dto/update-cadete.dto';

@Injectable()
export class CadeteService {
  create(createCadeteDto: CreateCadeteDto) {
    return 'This action adds a new cadete';
  }

  findAll() {
    return `This action returns all cadete`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cadete`;
  }

  update(id: number, updateCadeteDto: UpdateCadeteDto) {
    return `This action updates a #${id} cadete`;
  }

  remove(id: number) {
    return `This action removes a #${id} cadete`;
  }
}
