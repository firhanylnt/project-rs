import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Appointments } from './entities/appointments.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

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

    // TODO: assign doctor ID

    return await this.repo.save(appo);
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

    // TODO: generate QR Code Image with QR Code value is id

    return queryResult;
  }

  async generateQR(id) {
    let appo = await this.repo.findOne({
      where: { id: id },
    });

    if (appo != null) {
      const qr = require('qrcode'); // Import the qrcode library

      const qrCodeValue = appo.id; // Get the appointment ID as the QR code value

      // Generate the QR code image
      const qrCodeOptions = {
        errorCorrectionLevel: 'H', // High error correction level for better readability
        type: 'image/png', // You can choose other formats like 'image/jpeg', 'image/svg', etc.
        margin: 2, // Set the QR code margin
      };

      try {
        const qrCodeImage = await qr.toDataURL(qrCodeValue, qrCodeOptions);

        // Alternatively, you can return the qrCodeImage to the caller
        return qrCodeImage;
      } catch (error) {
        // Handle any errors that occur during QR code generation
        console.error('Error generating QR code:', error);
        return null;
      }
    } else {
      // Handle the case when the appointment ID is not found or invalid
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
}
