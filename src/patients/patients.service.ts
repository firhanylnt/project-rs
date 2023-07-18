import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly repo: Repository<Patient>,
    private readonly connection2: Connection,
  ) {}

  async getAll() {
    return this.connection2.query(`
      select * from patients
    `);
  }

  async store(data: CreatePatientDto) {
    const patient = new Patient();
    patient.id = this.generateID(6)
    patient.first_name = data.first_name
    patient.last_name = data.last_name
    patient.gender = data.gender
    patient.dob = data.dob
    patient.email = data.email
    patient.phone = data.phone
    patient.address = data.address

    return await this.repo.save(patient);
  }

  async getById(id) {
    const doc = await this.repo.findOne({
      where: { id: id },
    });

    return doc
  }

  async update(id, data: UpdatePatientDto) {
    const patient = {
      first_name: data.first_name,
      last_name: data.last_name,
      gender: data.gender,
      dob: data.dob,
      email: data.email,
      phone: data.phone,
      address: data.address,
      updated_at: new Date()
    };

    await this.repo.update(id, patient);

    return await this.repo.findOne({
      where: { id: id },
    });
  }

  async remove(id) {
    const result = await this.repo.delete({ id: id });
    if (result.affected > 0) return {'message': 'Patient deleted!'}
    else return {'message': 'Failed to delete Patient!'}
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
