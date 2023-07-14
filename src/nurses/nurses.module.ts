import { Module } from '@nestjs/common';
import { NursesService } from './nurses.service';
import { NursesController } from './nurses.controller';

@Module({
  controllers: [NursesController],
  providers: [NursesService]
})
export class NursesModule {}
