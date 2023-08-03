import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { DoctorBackgroundService } from './doctor-backgrounds.service';
import { CreateDoctorBackgroundDto } from './dto/create-doctor-background.dto';
import { UpdateDoctorBackgroundDto } from './dto/update-doctor-background.dto';
import { ValidationPipe } from '@nestjs/common'; // Add this import

@Controller('doctor-backgrounds')
export class DoctorBackgroundController {
  constructor(private readonly svc: DoctorBackgroundService) {}

  @Post()
  create(@Body(new ValidationPipe()) dto: CreateDoctorBackgroundDto) { // Add ValidationPipe here
    return this.svc.store(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.svc.getById(id);
  }

  @Post(':id')
  update(@Param('id') id: number, @Body(new ValidationPipe()) dto: UpdateDoctorBackgroundDto) { // Add ValidationPipe here
    return this.svc.update(id, dto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: number) {
    return this.svc.remove(id);
  }
}
