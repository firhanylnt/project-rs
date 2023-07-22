import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Specialization } from './entities/specialization.entity';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';

@Injectable()
export class SpecializationService {
  constructor(
    @InjectRepository(Specialization)
    private readonly repo: Repository<Specialization>,
    private readonly connection2: Connection,
  ) {}

  async getAll() {
    return this.connection2.query(`
      select s.id, s.name as specialization from specializations as s
      order by s.id desc
    `);
  }

  async store(data: CreateSpecializationDto) {
    const spec = new Specialization();
    spec.name = data.name;

    return await this.repo.save(spec);
  }

  async getById(id) {
    const spec = await this.repo.findOne({
      where: { id: id },
    });

    return spec;
  }

  async update(id, data: UpdateSpecializationDto) {
    const spec = {
      name: data.name,
      updated_at: new Date(),
    };

    await this.repo.update(id, spec);

    return await this.repo.findOne({
      where: { id: id },
    });
  }

  async remove(id) {
    const result = await this.repo.delete({ id: id });
    if (result.affected > 0) return { message: 'Specialization deleted!' };
    else return { message: 'Failed to delete Specialization!' };
  }

  generate_code(length) {
    let result = '';
    const characters = '123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
