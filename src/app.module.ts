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
        entities: [Specialization, Doctor, Patient, Roomtype, Room, Ipd, Appointment],
        synchronize: false,
      }),
    }),
    DoctorsModule,
    AuthModule,
    PatientsModule,
    SpecializationModule,
    AppointmentModule,
    PharmacistsModule,
    NursesModule,
    ReceptionistsModule,
    RoomtypeModule,
    RoomModule,
    MedicineModule,
    BloodsModule,
    IpdModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
