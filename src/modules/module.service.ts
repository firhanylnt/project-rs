import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Module } from './entities/module.entity';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(Module)
    private readonly repo: Repository<Module>,
  ) {}

  async getAll() {
    return this.repo.find();
  }

  async store(data: CreateModuleDto) {
    const src = new Module();
    src.name = data.name;
    src.url_path = data.url_path;
    src.icon = data.icon;
    src.is_active = data.is_active;
    return await this.repo.save(src);
  }

  async getById(id) {
    const src = await this.repo.findOne({
      where: { id: id },
    });

    return src;
  }

  async update(id, data: UpdateModuleDto) {
    const src = {
      name: data.name,
      url_path: data.url_path,
      icon: data.icon,
      is_active: data.is_active,
      updated_at: new Date(),
    };

    await this.repo.update(id, src);

    return await this.repo.findOne({
      where: { id: id },
    });
  }

  async remove(id) {
    const result = await this.repo.delete({ id: id });
    if (result.affected > 0) return { message: 'Module deleted!' };
    else return { message: 'Failed to delete Module!' };
  }
}
