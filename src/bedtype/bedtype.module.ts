import { Module } from '@nestjs/common';
import { BedtypeService } from './bedtype.service';
import { BedtypeController } from './bedtype.controller';

@Module({
  controllers: [BedtypeController],
  providers: [BedtypeService]
})
export class BedtypeModule {}
