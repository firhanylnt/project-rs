import { Module } from '@nestjs/common';
import { TrmService } from './trm.service';
import { TrmController } from './trm.controller';

@Module({
  controllers: [TrmController],
  providers: [TrmService]
})
export class TrmModule {}
