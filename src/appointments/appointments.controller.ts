import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.store(createAppointmentDto);
  }

  @Get()
  findAll() {
    return this.appointmentService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.getById(id);
  }

  @Get(':id/qr')
  generateQR(@Param('id') id: string) {
    return this.appointmentService.generateQR(id);
  }

  @Post(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(id);
  }
}
