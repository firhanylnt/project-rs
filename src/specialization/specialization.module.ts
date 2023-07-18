import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecializationService } from './specialization.service';
import { SpecializationController } from './specialization.controller';
import { Specialization } from './entities/specialization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Specialization])],
  controllers: [SpecializationController],
  providers: [SpecializationService]
})
export class SpecializationModule {}
