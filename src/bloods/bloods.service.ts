import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBloodDto } from './dto/create-blood.dto';
import { UpdateBloodDto } from './dto/update-blood.dto';
import { readFileSync, writeFileSync } from 'fs';
import { BloodBank } from './entities/blood.entity';

@Injectable()
export class BloodsService {
  constructor(
    @InjectRepository(BloodBank)
    private readonly repo: Repository<BloodBank>,
  ) {}

  async getAll() {
    return this.repo.find();
  }

  async store(data: CreateBloodDto) {
    const src = new BloodBank();
    src.name = data.name;
    src.stock = data.stock;
    return await this.repo.save(src);
  }

  async getById(id) {
    const src = await this.repo.findOne({
      where: { id: id },
    });

    return src;
  }

  async update(id, data: UpdateBloodDto) {
    const src = {
      name: data.name,
      stock: data.stock,
      updated_at: new Date(),
    };

    await this.repo.update(id, src);

    return await this.repo.findOne({
      where: { id: id },
    });
  }

  async remove(id) {
    const result = await this.repo.delete({ id: id });
    if (result.affected > 0) return { message: 'Bloog Group deleted!' };
    else return { message: 'Failed to delete Bloog Group!' };
  }
}
