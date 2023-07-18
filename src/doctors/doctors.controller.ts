import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.store(createDoctorDto);
  }

  @Get()
  findAll(@Query() query: any) {
    const { specialization, gender } = query;

    return this.doctorsService.getAll(specialization);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.getById(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(id, updateDoctorDto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(id);
  }
}
