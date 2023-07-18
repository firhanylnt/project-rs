import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly repo: Repository<Doctor>,
    private readonly connection2: Connection,
  ) {}

  async getAll(specialization = null) {
    let whereQuery = ''
    if (specialization != null) whereQuery = `where s.name like '%${specialization}%'`
    return this.connection2.query(`
      select d.id, s.name as specialization, d.name, d.gender from doctors as d
      inner join specializations as s on d.specialization_id = s.id
      ${whereQuery}
    `);
  }

  async store(data: CreateDoctorDto) {
    const doc = new Doctor();
    doc.id = this.generateID(6)
    doc.specialization_id = data.specialization_id
    doc.name = data.name
    doc.dob = data.dob
    doc.gender = data.gender
    doc.email = data.email
    doc.phone = data.phone

    return await this.repo.save(doc);
  }

  async getById(id) {
    const queryResult = await this.connection2
    .createQueryBuilder()
    .select('d.id', 'id')
    .addSelect('d.specialization_id', 'specialization_id')
    .addSelect('s.name', 'specialization')
    .addSelect('d.name', 'name')
    .addSelect('d.dob', 'dob')
    .addSelect('d.gender', 'gender')
    .addSelect('d.email', 'email')
    .addSelect('d.phone', 'phone')
    .addSelect('d.created_at', 'created_at')
    .addSelect('d.updated_at', 'updated_at')
    .from('doctors', 'd')
    .innerJoin('specializations', 's', 'd.specialization_id = s.id')
    .where('d.id = :id', { id: id }) 
    .limit(1)
    .getRawOne();

    return queryResult;
  }

  async update(id, data: UpdateDoctorDto) {
    const doc = {
      specialization_id: data.specialization_id,
      name: data.name,
      dob: data.dob,
      gender: data.gender,
      email: data.email,
      phone: data.phone,
      updated_at: new Date()
    };

    await this.repo.update(id, doc);

    return await this.repo.findOne({
      where: { id: id },
    });
  }

  async remove(id) {
    const result = await this.repo.delete({ id: id });
    if (result.affected > 0) return {'message': 'Doctor deleted!'}
    else return {'message': 'Failed to delete Doctor!'}
  }

  generateID(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const charsetLength = charset.length;
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charsetLength);
      result += charset[randomIndex];
    }
  
    return result;
  }
}
