import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';

@Controller('hospitals')
export class HospitalController {
  constructor(private readonly service: HospitalService) {}

  @Post()
  create(@Body() dto: CreateHospitalDto) {
    return this.service.store(dto);
  }

  @Get()
  findAll() {
    return this.service.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.getById(id);
  }

  @Post(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateHospitalDto,
  ) {
    return this.service.update(id, dto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
