import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { DoctorBackground } from './entities/doctor-background.entity';
import { DoctorBackgroundService } from './doctor-backgrounds.service';
import { DoctorBackgroundController } from './doctor-backgrounds.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, DoctorBackground])],
  controllers: [DoctorsController, DoctorBackgroundController],
  providers: [DoctorsService, DoctorBackgroundService]
})
export class DoctorsModule {}
