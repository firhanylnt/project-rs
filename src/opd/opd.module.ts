import { Module } from '@nestjs/common';
import { OpdService } from './opd.service';
import { OpdController } from './opd.controller';

@Module({
  controllers: [OpdController],
  providers: [OpdService]
})
export class OpdModule {}
