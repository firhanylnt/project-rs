import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { Assets } from './entities/asset.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Assets])],
  controllers: [AssetsController],
  providers: [AssetsService],
})
export class AssetsModule {}
