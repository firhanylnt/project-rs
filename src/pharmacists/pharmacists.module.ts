import { Module } from '@nestjs/common';
import { PharmacistsService } from './pharmacists.service';
import { PharmacistsController } from './pharmacists.controller';
import { Pharmacist } from './entities/pharmacist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Pharmacist])],
  controllers: [PharmacistsController],
  providers: [PharmacistsService],
})
export class PharmacistsModule {}
