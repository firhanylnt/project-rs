import { Module } from '@nestjs/common';
import { IpdService } from './ipd.service';
import { IpdController } from './ipd.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ipd } from './entities/ipd.entity';
import { PatientIpdDiagnosis } from './entities/ipd-diagnosis.entity';
import { PatientIpdmedicine } from './entities/ipd-medicine.entity';
import { IpdRoom } from './entities/ipd-rooms.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ipd,
      PatientIpdDiagnosis,
      PatientIpdmedicine,
      IpdRoom,
    ]),
  ],
  controllers: [IpdController],
  providers: [IpdService],
})
export class IpdModule {}
