import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalModuleService } from './hospital-module.service';
import { HospitalModuleController } from './hospital-module.controller';
import { HospitalModuleEntity } from './entities/hospital-module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HospitalModuleEntity])],
  controllers: [HospitalModuleController],
  providers: [HospitalModuleService],
})
export class HospitalModuleModul {}
