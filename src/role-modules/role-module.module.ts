import { Module } from '@nestjs/common';
import { RoleModuleService} from './role-module.service';
import { RoleModuleController } from './role-module.controller';
import { RoleModule } from './entities/role-module.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RoleModule])],
  controllers: [RoleModuleController],
  providers: [RoleModuleService],
})
export class RoleModuleModul {}
