import { Module } from '@nestjs/common';
import { BloodsService } from './bloods.service';
import { BloodsController } from './bloods.controller';

@Module({
  controllers: [BloodsController],
  providers: [BloodsService]
})
export class BloodsModule {}
