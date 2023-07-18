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

  // id, patient, room, date, status
  async getAll() {
    return this.connection2.query(`
      select pi.id, p.first_name as patient, r.room_number as room, pi.admission_date as date, case when pi.is_active then 'Active' else 'Inactive' end as status from patients_ipd as pi
      inner join patients as p on pi.patient_id = p.id
      inner join rooms as r on pi.room_id = r.id
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
    const queryResult = await this.connection2
    .createQueryBuilder()
    .select('i.id', 'id')
    .addSelect('i.patient_id', 'patient_id')
    .addSelect('p.first_name', 'patient_first_name')
    .addSelect('p.last_name', 'patient_last_name')
    .addSelect('p.dob', 'patient_dob')
    .addSelect('i.room_id', 'room_id')
    .addSelect('r.room_number', 'room_number')
    .addSelect('rt.room_type', 'room_type')
    .addSelect('i.blood_pressure', 'blood_pressure')
    .addSelect('i.height', 'height')
    .addSelect('i.weight', 'weight')
    .addSelect('i.admission_date', 'admission_date')
    .addSelect('i.payment_method', 'payment_method')
    .addSelect('i.symptoms', 'symptoms')
    .addSelect('i.notes', 'notes')
    .addSelect('i.is_active', 'is_active')
    .addSelect('i.created_at', 'created_at')
    .addSelect('i.updated_at', 'updated_at')
    .from('patients_ipd', 'i')
    .innerJoin('patients', 'p', 'i.patient_id = p.id')
    .innerJoin('rooms', 'r', 'i.room_id = r.id')
    .innerJoin('room_types', 'rt', 'r.room_type_id = rt.id')
    .where('i.id = :id', { id: id }) 
    .limit(1)
    .getRawOne();

    return queryResult
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
