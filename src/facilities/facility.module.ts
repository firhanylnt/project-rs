import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facility } from './entities/facility.entity';
import { FacilityService } from './facility.service';
import { FacilityController } from './facility.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Facility])],
  controllers: [FacilityController],
  providers: [FacilityService]
})
export class FacilityModule {}
