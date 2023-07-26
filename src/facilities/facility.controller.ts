import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FacilityService } from './facility.service';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';

@Controller('facilities')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) {}

  @Post()
  create(@Body() dto: CreateFacilityDto) {
    return this.facilityService.store(dto);
  }

  @Get()
  findAll() {
    return this.facilityService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.facilityService.getById(id);
  }

  @Post(':id')
  update(@Param('id') id: number, @Body() dto: UpdateFacilityDto) {
    return this.facilityService.update(id, dto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: number) {
    return this.facilityService.remove(id);
  }
}
