import { Injectable } from '@nestjs/common';
import { CreateTrmDto } from './dto/create-trm.dto';
import { UpdateTrmDto } from './dto/update-trm.dto';

@Injectable()
export class TrmService {
  create(createTrmDto: CreateTrmDto) {
    return 'This action adds a new trm';
  }

  findAll() {
    return `This action returns all trm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trm`;
  }

  update(id: number, updateTrmDto: UpdateTrmDto) {
    return `This action updates a #${id} trm`;
  }

  remove(id: number) {
    return `This action removes a #${id} trm`;
  }
}
