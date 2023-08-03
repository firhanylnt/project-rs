import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { DoctorBackground } from './entities/doctor-background.entity';
import { CreateDoctorBackgroundDto } from './dto/create-doctor-background.dto';
import { UpdateDoctorBackgroundDto } from './dto/update-doctor-background.dto';

@Injectable()
export class DoctorBackgroundService {
  constructor(
    @InjectRepository(DoctorBackground)
    private readonly repo: Repository<DoctorBackground>,
    private readonly connection: Connection,
  ) {}

  async getAll(doctorId) {
    return this.connection.query(`
      select year, education, is_formal
      from doctor_backgrounds
      where doctor_id = '${doctorId}'
      order by year asc
    `);
  }

  async store(data: CreateDoctorBackgroundDto) {
    const src = new DoctorBackground();
    src.doctor_id = data.doctor_id
    src.year = data.year
    src.education = data.education
    src.is_formal = data.is_formal

    return await this.repo.save(src);
  }

  async getById(id) {
    const queryResult = await this.connection
    .createQueryBuilder()
    .select('db.id', 'id')
    .addSelect('d.name', 'doctor_name')
    .addSelect('db.doctor_id', 'doctor_id')
    .addSelect('db.year', 'year')
    .addSelect('db.education', 'education')
    .addSelect('db.is_formal', 'is_formal')
    .from('doctor_backgrounds', 'db')
    .innerJoin('doctors', 'd', 'db.doctor_id = d.id')
    .where('db.id = :id', { id: id }) 
    .limit(1)
    .getRawOne();

    return queryResult;
  }

  async update(id, data: UpdateDoctorBackgroundDto) {
    const doc = {
      year: data.year,
      education: data.education,
      is_formal: data.is_formal,
      updated_at: new Date()
    };

    await this.repo.update(id, doc);

    return await this.repo.findOne({
      where: { id: id },
    });
  }

  async remove(id) {
    const result = await this.repo.delete({ id: id });
    if (result.affected > 0) return {'message': 'Doctor background deleted!'}
    else return {'message': 'Failed to delete Doctor background!'}
  }
}
