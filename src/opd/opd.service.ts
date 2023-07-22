import { Injectable } from '@nestjs/common';
import { CreateOpdDto } from './dto/create-opd.dto';
import { UpdateOpdDto } from './dto/update-opd.dto';

@Injectable()
export class OpdService {
  create(createOpdDto: CreateOpdDto) {
    return 'This action adds a new opd';
  }

  findAll() {
    return `This action returns all opd`;
  }

  findOne(id: number) {
    return `This action returns a #${id} opd`;
  }

  update(id: number, updateOpdDto: UpdateOpdDto) {
    return `This action updates a #${id} opd`;
  }

  remove(id: number) {
    return `This action removes a #${id} opd`;
  }
}
