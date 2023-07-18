import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.store(createAppointmentDto);
  }

  @Get()
  findAll() {
    return this.appointmentService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.appointmentService.getById(id);
  }

  @Post(':id')
  update(
    @Param('id') id: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: number) {
    return this.appointmentService.remove(id);
  }
}
