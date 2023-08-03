import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  create(@Body() dto: CreateDoctorDto, @UploadedFile() photo: any) {
    dto.photo = photo
    return this.doctorsService.store(dto);
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
  @UseInterceptors(FileInterceptor('photo'))
  update(@Param('id') id: string, @Body() dto: UpdateDoctorDto, @UploadedFile() photo: any) {
    dto.photo = photo
    return this.doctorsService.update(id, dto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(id);
  }
}
