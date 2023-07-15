import { Module } from '@nestjs/common';
import { BedroomService } from './bedroom.service';
import { BedroomController } from './bedroom.controller';

@Module({
  controllers: [BedroomController],
  providers: [BedroomService]
})
export class BedroomModule {}
