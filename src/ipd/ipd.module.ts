import { Module } from '@nestjs/common';
import { IpdService } from './ipd.service';
import { IpdController } from './ipd.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ipd } from './entities/ipd.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ipd])],
  controllers: [IpdController],
  providers: [IpdService]
})
export class IpdModule {}
