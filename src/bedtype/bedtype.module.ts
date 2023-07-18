import { Module } from '@nestjs/common';
import { BedtypeService } from './bedtype.service';
import { BedtypeController } from './bedtype.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bedtype } from './entities/bedtype.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bedtype])],
  controllers: [BedtypeController],
  providers: [BedtypeService]
})
export class BedtypeModule {}
