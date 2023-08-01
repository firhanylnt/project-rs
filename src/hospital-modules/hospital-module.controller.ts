import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { HospitalModuleService } from './hospital-module.service';
import { CreateHospitalModuleDto } from './dto/create-hospital-module.dto';

@Controller('hospitals-modules')
export class HospitalModuleController {
  constructor(private readonly service: HospitalModuleService) {}

  @Post()
  create(@Body() dto: CreateHospitalModuleDto) {
    return this.service.store(dto);
  }
}
