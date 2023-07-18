import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Ipd } from './entities/ipd.entity';
import { CreateIpdDto } from './dto/create-ipd.dto';
import { UpdateIpdDto } from './dto/update-ipd.dto';

@Injectable()
export class IpdService {
  constructor(
    @InjectRepository(Ipd)
    private readonly repo: Repository<Ipd>,
    private readonly connection2: Connection,
  ) {}

  async getAll() {
    return this.connection2.query(`
      select * from patients_ipd
    `);
  }

  async store(data: CreateIpdDto) {
    const ipd = new Ipd();
    ipd.id = this.generateID(6)
    ipd.patient_id = data.patient_id
    ipd.room_id = data.room_id
    ipd.blood_pressure = data.blood_pressure
    ipd.height = data.height
    ipd.weight = data.weight
    ipd.admission_date = data.admission_date
    ipd.payment_method = data.payment_method
    ipd.symptoms = data.symptoms
    ipd.notes = data.notes
    ipd.is_active = data.is_active

    return await this.repo.save(ipd);
  }

  async getById(id) {
    const doc = await this.repo.findOne({
      where: { id: id },
    });

    return doc
  }

  async update(id, data: UpdateIpdDto) {
    const ipd = {
      patient_id: data.patient_id,
      room_id: data.room_id,
      blood_pressure: data.blood_pressure,
      height: data.height,
      weight: data.weight,
      admission_date: data.admission_date,
      payment_method: data.payment_method,
      symptoms: data.symptoms,
      notes: data.notes,
      is_active: data.is_active,
      updated_at: new Date()
    };

    await this.repo.update(id, ipd);

    return await this.repo.findOne({
      where: { id: id },
    });
  }

  async remove(id) {
    const result = await this.repo.delete({ id: id });
    if (result.affected > 0) return {'message': 'Patient IPD deleted!'}
    else return {'message': 'Failed to delete Patient IPD!'}
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
