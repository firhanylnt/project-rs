import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorsModule } from './doctors/doctors.module';
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';
import { SpecializationModule } from './specialization/specialization.module';
import { AppointmentModule } from './appointment/appointment.module';
import { PharmacistsModule } from './pharmacists/pharmacists.module';
import { NursesModule } from './nurses/nurses.module';
import { ReceptionistsModule } from './receptionists/receptionists.module';
import { RoomtypeModule } from './roomtype/roomtype.module';
import { RoomModule } from './room/room.module';
import { MedicineModule } from './medicine/medicine.module';
import { BloodsModule } from './bloods/bloods.module';
import { IpdModule } from './ipd/ipd.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule, Module } from '@nestjs/common';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Specialization } from './specialization/entities/specialization.entity';
import { Doctor } from './doctors/entities/doctor.entity';
import { Patient } from './patients/entities/patient.entity';
import { Roomtype } from './roomtype/entities/roomtype.entity';
import { Room } from './room/entities/room.entity';
import { Ipd } from './ipd/entities/ipd.entity';
import { Appointment } from './appointment/entities/appointment.entity';
import { AssetsModule } from './assets/assets.module';
import { Receptionist } from './receptionists/entities/receptionist.entity';
import { Pharmacist } from './pharmacists/entities/pharmacist.entity';
import { Nurses } from './nurses/entities/nurse.entity';
import { Medicine } from './medicine/entities/medicine.entity';
import { Assets } from './assets/entities/asset.entity';
import { BloodBank } from './bloods/entities/blood.entity';
import { Users } from './users/entities/user.entity';
import { Appointments } from './appointments/entities/appointments.entity';
import { AppointmentsModule } from './appointments/appointments.module';
import { OpdModule } from './opd/opd.module';
import { Opd } from './opd/entities/opd.entity';
import { InvoiceModule } from './invoice/invoice.module';
import { Invoices } from './invoice/entities/invoices.entity';
import { PatientIpdDiagnosis } from './ipd/entities/ipd-diagnosis.entity';
import { PatientIpdmedicine } from './ipd/entities/ipd-medicine.entity';
import { TrmModule } from './trm/trm.module';
import { MedicineCategory } from './medicine-categories/entities/medicine-category.entity';
import { MedicineCategoryModule } from './medicine-categories/medicine-category.module';
import { InvoiceDetails } from './invoice/entities/invoice-details.entity';
import { PatientOpdmedicine } from './opd/entities/opd-medicine.entity';
import { IpdRoom } from './ipd/entities/ipd-rooms.entity';
import { FacilityModule } from './facilities/facility.module';
import { Facility } from './facilities/entities/facility.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, HttpModule],
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService,
      ): Partial<PostgresConnectionOptions> => ({
        type: 'postgres',
        host: '203.175.11.205',
        port: 5432,
        username: 'admin',
        password: 'dimedicadmin',
        database: 'dimedic',
        entities: [
          Specialization,
          Doctor,
          Patient,
          Roomtype,
          Room,
          Ipd,
          Appointment,
          Appointments,
          Receptionist,
          Pharmacist,
          Nurses,
          MedicineCategory,
          Medicine,
          Assets,
          BloodBank,
          Users,
          Opd,
          Invoices,
          PatientIpdDiagnosis,
          PatientIpdmedicine,
          PatientOpdmedicine,
          InvoiceDetails,
          Invoices,
          IpdRoom,
          Facility,
        ],
        synchronize: false,
      }),
    }),
    DoctorsModule,
    AuthModule,
    PatientsModule,
    SpecializationModule,
    AppointmentModule,
    AppointmentsModule, // appointment v2
    PharmacistsModule,
    NursesModule,
    ReceptionistsModule,
    RoomtypeModule,
    RoomModule,
    MedicineCategoryModule,
    MedicineModule,
    BloodsModule,
    IpdModule,
    UsersModule,
    AssetsModule,
    OpdModule,
    InvoiceModule,
    FacilityModule,
    TrmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
