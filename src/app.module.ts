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

@Module({
  imports: [
    DoctorsModule,
    AuthModule,
    PatientsModule,
    SpecializationModule,
    AppointmentModule,
    PharmacistsModule,
    NursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
