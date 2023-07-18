import { Module } from '@nestjs/common';
import { RoomtypeService } from './roomtype.service';
import { RoomtypeController } from './roomtype.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roomtype } from './entities/roomtype.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Roomtype])],
  controllers: [RoomtypeController],
  providers: [RoomtypeService]
})
export class RoomtypeModule {}
