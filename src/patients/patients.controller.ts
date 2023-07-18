import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.store(createPatientDto);
  }

  @Get()
  findAll() {
    return this.patientsService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.getById(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(id, updatePatientDto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }
}
