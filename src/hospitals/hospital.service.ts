import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hospital } from './entities/hospital.entity';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';

@Injectable()
export class HospitalService {
  constructor(
    @InjectRepository(Hospital)
    private readonly repo: Repository<Hospital>,
  ) {}

  async getAll() {
    return this.repo.find();
  }

  async store(data: CreateHospitalDto) {
    const src = new Hospital();
    src.name = data.name;
    src.logo_url = data.logo_url;
    src.sidebar_bg = data.sidebar_bg;
    return await this.repo.save(src);
  }

  async getById(id) {
    const src = await this.repo.findOne({
      where: { id: id },
    });

    return src;
  }

  async update(id, data: UpdateHospitalDto) {
    const src = {
      name: data.name,
      logo_url: data.logo_url,
      sidebar_bg: data.sidebar_bg,
      updated_at: new Date(),
    };

    await this.repo.update(id, src);

    return await this.repo.findOne({
      where: { id: id },
    });
  }

  async remove(id) {
    const result = await this.repo.delete({ id: id });
    if (result.affected > 0) return { message: 'Hospital deleted!' };
    else return { message: 'Failed to delete Hospital!' };
  }
}
