import { Module } from '@nestjs/common';
import { OpdService } from './opd.service';
import { OpdController } from './opd.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Opd } from './entities/opd.entity';
import { PatientOpdmedicine } from './entities/opd-medicine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Opd, PatientOpdmedicine])],
  controllers: [OpdController],
  providers: [OpdService],
})
export class OpdModule {}
