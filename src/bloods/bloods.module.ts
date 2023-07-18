import { Module } from '@nestjs/common';
import { BloodsService } from './bloods.service';
import { BloodsController } from './bloods.controller';
import { BloodBank } from './entities/blood.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BloodBank])],
  controllers: [BloodsController],
  providers: [BloodsService],
})
export class BloodsModule {}
