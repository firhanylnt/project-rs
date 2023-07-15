import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NursesService } from './nurses.service';
import { CreateNurseDto } from './dto/create-nurse.dto';
import { UpdateNurseDto } from './dto/update-nurse.dto';

@Controller('nurses')
export class NursesController {
  constructor(private readonly nursesService: NursesService) {}

  @Post()
  create(@Body() createNurseDto: CreateNurseDto) {
    return this.nursesService.create(createNurseDto);
  }

  @Get()
  findAll() {
    return this.nursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nursesService.findOne(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateNurseDto: UpdateNurseDto) {
    return this.nursesService.update(id, updateNurseDto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.nursesService.remove(id);
  }
}
