import { Module } from '@nestjs/common';
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
import { BedtypeModule } from './bedtype/bedtype.module';
import { BedroomModule } from './bedroom/bedroom.module';
import { MedicineModule } from './medicine/medicine.module';
import { BloodsModule } from './bloods/bloods.module';
import { IpdModule } from './ipd/ipd.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    DoctorsModule,
    AuthModule,
    PatientsModule,
    SpecializationModule,
    AppointmentModule,
    PharmacistsModule,
    NursesModule,
    ReceptionistsModule,
    BedtypeModule,
    BedroomModule,
    MedicineModule,
    BloodsModule,
    IpdModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
