import { Module } from '@nestjs/common';
import { NursesService } from './nurses.service';
import { NursesController } from './nurses.controller';
import { Nurses } from './entities/nurse.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Nurses])],
  controllers: [NursesController],
  providers: [NursesService],
})
export class NursesModule {}
