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
      select * from appointments
    `);
  }

  async store(data: CreateAppointmentDto) {
    const appo = new Appointment();
    appo.patient_id = data.patient_id
    appo.specialization_id = data.specialization_id
    appo.doctor_id = data.doctor_id
    appo.appointment_date = data.appointment_date
    appo.payment_method = data.payment_method

    return await this.repo.save(appo);
  }

  async getById(id) {
    const doc = await this.repo.findOne({
      where: { id: id },
    });

    return doc
  }

  async update(id, data: UpdateAppointmentDto) {
    const appo = {
      patient_id: data.patient_id,
      specialization_id: data.specialization_id,
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
