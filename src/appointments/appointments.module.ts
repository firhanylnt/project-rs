import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointments } from './entities/appointments.entity';
import { Receptionist } from 'src/receptionists/entities/receptionist.entity';
import { Users } from 'src/users/entities/user.entity';
import { Patient } from 'src/patients/entities/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointments, Receptionist, Users, Patient])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService]
})
export class AppointmentsModule {}
