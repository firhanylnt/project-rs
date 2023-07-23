import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Appointments } from './entities/appointments.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import axios from 'axios';
import { Receptionist } from 'src/receptionists/entities/receptionist.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Receptionist)
    private readonly receptionistRepo: Repository<Receptionist>,
    @InjectRepository(Appointments)
    private readonly repo: Repository<Appointments>,
    private readonly connection2: Connection,
  ) {}

  days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  async getAll(userId = null, email = null) {
    return this.connection2.query(`
        select a.*, s.name as specialization, d.name as doctor from appointments_v2 as a
        left join specializations as s on a.specialization_id = s.id
        left join doctors as d on a.doctor_id = d.id
        left join users as du on d.user_id = du.id
        ${
          email !== null
            ? `where a.email = '${email}'`
            : userId !== null
            ? `where du.id = ${userId}`
            : ``
        }
        order by created_at desc
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
    appo.is_approved = false;
    if (data.is_approved != null) appo.is_approved = data.is_approved;

    const result = await this.repo.save(appo);

    if (result.is_approved === false) {
      // send wa notification to patient
      this.sendWaMessage(
        appo.phone_number,
        `Dear ${appo.patient_name}, your appointment request has been received. You will receive notification once your appointment is approved.`,
      );

      // send wa notification to receptionist
      const receptionist = await this.receptionistRepo.findOne();
      this.sendWaMessage(
        receptionist.phone,
        `Dear ${receptionist.first_name}, you have an appointment request by ${appo.patient_name}. Please check below link for the detail of the appointment.\n\nhttps://fe-dimedic.dividefense.com/appointment/${result.id}/view`,
      );
    } else if (result.is_approved === true && result.doctor_id !== null) {
      const doctor = await this.connection2.query(`
      select d.name, d.phone from doctors as d
      where d.id = '${appo.doctor_id}'
    `);
      const specialization = await this.connection2.query(`
      select s.name from specializations as s
      where s.id = ${appo.specialization_id}
    `);

      // send wa notification to patient
      const appoDate = new Date(data.appointment_date);
      const appoDateStr = `${
        this.days[appoDate.getUTCDay()]
      }, ${appoDate.getUTCDate()} ${
        this.months[appoDate.getUTCMonth()]
      } ${appoDate.getUTCFullYear()} ${appoDate.getUTCHours()}:${appoDate.getUTCMinutes()} (UTC)`;
      this.sendWaMessage(
        appo.phone_number,
        `Dear ${appo.patient_name}, your appointment with ${doctor[0].name} (${specialization[0].name}) confirmed for *${appoDateStr}*. Please visit the hospital 30 minutes before the scheduled time.`,
      );

      // send wa notification to doctor
      this.sendWaMessage(
        doctor[0].phone,
        `Dear ${doctor[0].name}, you have an appointment by ${appo.patient_name}. Please check below link for the detail of the appointment.\n\nhttps://fe-dimedic.dividefense.com/appointment/${result.id}/view`,
      );
    }

    return result;
  }

  async getById(id) {
    const queryResult = await this.connection2
      .createQueryBuilder()
      .select('a.id', 'id')
      .addSelect('a.appointment_date', 'date')
      .addSelect('s.id', 'specialization_id')
      .addSelect('s.name', 'specialization')
      .addSelect('d.id', 'doctor_id')
      .addSelect('d.name', 'doctor')
      .addSelect('a.email', 'email')
      .addSelect('a.phone_number', 'phone_number')
      .addSelect('a.patient_name', 'patient_name')
      .addSelect('a.patient_gender', 'patient_gender')
      .addSelect('a.description', 'description')
      .addSelect('a.is_approved', 'is_approved')
      .addSelect('a.is_need_opd', 'is_need_opd')
      .from('appointments_v2', 'a')
      .leftJoin('specializations', 's', 'a.specialization_id = s.id')
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

      const qrCodeValue =
        'https://dimedic.dividefense.com/appointment-detail?appointment_id=' +
        appo.id;

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
      is_approved: data.is_approved,
      is_need_opd: data.is_need_opd,
      updated_at: new Date(),
    };

    await this.repo.update(id, appo);

    if (appo.is_need_opd != null) {
      if (appo.is_need_opd === true) {
        // send wa notification to receptionist
        const receptionist = await this.receptionistRepo.findOne();
        this.sendWaMessage(
          receptionist.phone,
          `Dear ${receptionist.first_name}, Appointment *${id}* by ${appo.patient_name} is need an OPD. Please check below link for the detail.\n\nhttps://fe-dimedic.dividefense.com/appointment/${id}/view`,
        );
      }
    } else {
      if (appo.is_approved === true && appo.doctor_id !== null) {
        const doctor = await this.connection2.query(`
          select d.name, d.phone from doctors as d
          where d.id = '${appo.doctor_id}'
        `);
        const specialization = await this.connection2.query(`
          select s.name from specializations as s
          where s.id = ${appo.specialization_id}
        `);

        // send wa notification to patient
        const appoDate = new Date(data.appointment_date);
        const appoDateStr = `${
          this.days[appoDate.getUTCDay()]
        }, ${appoDate.getUTCDate()} ${
          this.months[appoDate.getUTCMonth()]
        } ${appoDate.getUTCFullYear()} ${appoDate.getUTCHours()}:${appoDate.getUTCMinutes()} (UTC)`;
        this.sendWaMessage(
          appo.phone_number,
          `Dear ${appo.patient_name}, your appointment with ${doctor[0].name} (${specialization[0].name}) confirmed for *${appoDateStr}*. Please visit the hospital 30 minutes before the scheduled time.`,
        );

        // send wa notification to doctor
        this.sendWaMessage(
          doctor[0].phone,
          `Dear ${doctor[0].name}, you have an appointment by ${appo.patient_name}. Please check below link for the detail of the appointment.\n\nhttps://fe-dimedic.dividefense.com/appointment/${id}/view`,
        );
      }
    }

    return await this.repo.findOne({
      where: { id: id },
    });
  }

  async remove(id) {
    const result = await this.repo.delete({ id: id });
    if (result.affected > 0) return { message: 'Appointment deleted!' };
    else return { message: 'Failed to delete Appointment!' };
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

    axios
      .post(apiUrl, data)
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
