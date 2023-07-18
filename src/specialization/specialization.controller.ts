import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpecializationService } from './specialization.service';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';

@Controller('specialization')
export class SpecializationController {
  constructor(private readonly specializationService: SpecializationService) {}

  @Post()
  create(@Body() data: CreateSpecializationDto) {
    return this.specializationService.store(data);
  }

  @Get()
  findAll() {
    return this.specializationService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specializationService.findOne(id);
  }

  @Post(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpecializationDto: UpdateSpecializationDto,
  ) {
    return this.specializationService.update(id, updateSpecializationDto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.specializationService.remove(id);
  }
}
