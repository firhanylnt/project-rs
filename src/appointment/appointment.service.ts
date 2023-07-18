import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly repo: Repository<Appointment>,
    private readonly connection2: Connection,
  ) {}

  async getAll() {
    return this.connection2.query(`
      select a.id, p.first_name as patient, d.name as doctor, s.name as specialization, a.appointment_date as date, a.payment_method as payment from appointments as a
      inner join doctors as d on a.doctor_id = d.id
      inner join patients as p on a.patient_id = p.id
      inner join specializations as s on d.specialization_id = s.id
      order by a.id desc
    `);
  }

  async store(data: CreateAppointmentDto) {
    const appo = new Appointment();
    appo.patient_id = data.patient_id
    appo.doctor_id = data.doctor_id
    appo.appointment_date = data.appointment_date
    appo.payment_method = data.payment_method

    return await this.repo.save(appo);
  }

  async getById(id) {
    const queryResult = await this.connection2
    .createQueryBuilder()
    .select('a.id', 'id')
    .addSelect('p.id', 'patient_id')
    .addSelect('p.first_name', 'patient_first_name')
    .addSelect('p.last_name', 'patient_last_name')
    .addSelect('d.id', 'doctor_id')
    .addSelect('d.name', 'doctor_name')
    .addSelect('s.id', 'specialization_id')
    .addSelect('s.name', 'specialization')
    .addSelect('a.appointment_date', 'date')
    .addSelect('a.payment_method', 'payment')
    .from('appointments', 'a')
    .innerJoin('doctors', 'd', 'a.doctor_id = d.id')
    .innerJoin('patients', 'p', 'a.patient_id = p.id')
    .innerJoin('specializations', 's', 'd.specialization_id = s.id')
    .where('a.id = :id', { id: id }) 
    .limit(1)
    .getRawOne();

    return queryResult;
  }

  async update(id, data: UpdateAppointmentDto) {
    const appo = {
      patient_id: data.patient_id,
      doctor_id: data.doctor_id,
      appointment_date: data.appointment_date,
      payment_method: data.payment_method,  
      updated_at: new Date()
    };

    await this.repo.update(id, appo);

    return await this.repo.findOne({
      where: { id: id },
    });
  }

  async remove(id) {
    const result = await this.repo.delete({ id: id });
    if (result.affected > 0) return {'message': 'Appointment deleted!'}
    else return {'message': 'Failed to delete Appointment!'}
  }
}
