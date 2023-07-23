import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Appointments } from './entities/appointments.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import axios from 'axios';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointments)
    private readonly repo: Repository<Appointments>,
    private readonly connection2: Connection,
  ) { }

  async getAll() {
    return this.connection2.query(`
      select * from appointments_v2
    `);
  }

  async store(data: CreateAppointmentDto) {
    const appo = new Appointments();
    appo.id = this.generateID(10);
    appo.doctor_id = data.doctor_id;
    appo.specialization_id = data.specialization_id;
    appo.email = data.email;
    appo.phone_number = data.phone_number;
    appo.patient_name = data.patient_name;
    appo.patient_gender = data.patient_gender;
    appo.appointment_date = data.appointment_date;
    appo.description = data.description;

    const result = await this.repo.save(appo);

    // TODO: send wa notification to receptionist and patient
    this.sendWaMessage(appo.phone_number, `Dear ${appo.patient_name}, your appointment request has been received. You will receive notification once your appointment is approved.`)

    return result
  }

  async getById(id) {
    const queryResult = await this.connection2
      .createQueryBuilder()
      .select('a.id', 'id')
      .addSelect('a.appointment_date', 'date')
      .addSelect('s.name', 'specialization')
      .addSelect('d.name', 'doctor')
      .addSelect('a.email', 'email')
      .addSelect('a.phone_number', 'phone_number')
      .addSelect('a.patient_name', 'patient_name')
      .addSelect('a.patient_gender', 'patient_gender')
      .addSelect('a.description', 'description')
      .addSelect('a.is_approved', 'is_approved')
      .from('appointments_v2', 'a')
      .innerJoin('specializations', 's', 'a.specialization_id = s.id')
      .leftJoin('doctors', 'd', 'a.doctor_id = d.id')
      .where('a.id = :id', { id: id })
      .limit(1)
      .getRawOne();

    return queryResult;
  }

  async generateQR(id) {
    let appo = await this.repo.findOne({
      where: { id: id },
    });

    if (appo != null) {
      const qr = require('qrcode');

      const qrCodeValue = 'https://dimedic.dividefense.com/appointment-detail?appointment_id=' + appo.id;

      // Generate the QR code image
      const qrCodeOptions = {
        errorCorrectionLevel: 'H', // High error correction level for better readability
        type: 'image/png',
        margin: 3,
      };

      try {
        const qrCodeImage = await qr.toDataURL(qrCodeValue, qrCodeOptions);

        return qrCodeImage;
      } catch (error) {
        console.error('Error generating QR code:', error);
        return null;
      }
    } else {
      return null;
    }
  }

  async update(id, data: UpdateAppointmentDto) {
    const appo = {
      doctor_id: data.doctor_id,
      specialization_id: data.specialization_id,
      email: data.email,
      phone_number: data.phone_number,
      patient_name: data.patient_name,
      patient_gender: data.patient_gender,
      appointment_date: data.appointment_date,
      description: data.description,
      updated_at: new Date()
    };

    await this.repo.update(id, appo);

    return await this.repo.findOne({
      where: { id: id },
    });
  }

  async remove(id) {
    const result = await this.repo.delete({ id: id });
    if (result.affected > 0) return { 'message': 'Appointment deleted!' }
    else return { 'message': 'Failed to delete Appointment!' }
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

  sendWaMessage(phoneNumber, message) {
    const data = new URLSearchParams();
    data.append('token', 'XGAhQxWZVczsxqTrzG8RvuSEKRDtn4nKDpHYMhzD6eP1BbiYQd');
    data.append('number', phoneNumber);
    data.append('message', message);
    data.append('date', this.getCurrentDate());
    data.append('time', this.getCurrentTime());

    const apiUrl = 'https://app.ruangwa.id/api/send_message';

    axios.post(apiUrl, data)
      .then((response) => {
        console.log('Response:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1 and pad with '0'
    const day = String(today.getDate()).padStart(2, '0');
  
    const currentDate = `${year}-${month}-${day}`;
    return currentDate;
  }

  getCurrentTime() {
    const today = new Date();
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const seconds = String(today.getSeconds()).padStart(2, '0');
  
    const currentTime = `${hours}:${minutes}:${seconds}`;
    return currentTime;
  }  
}
