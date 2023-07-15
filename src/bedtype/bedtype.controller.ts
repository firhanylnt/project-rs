import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BedtypeService } from './bedtype.service';
import { CreateBedtypeDto } from './dto/create-bedtype.dto';
import { UpdateBedtypeDto } from './dto/update-bedtype.dto';

@Controller('bedtype')
export class BedtypeController {
  constructor(private readonly bedtypeService: BedtypeService) {}

  @Post()
  create(@Body() createBedtypeDto: CreateBedtypeDto) {
    return this.bedtypeService.create(createBedtypeDto);
  }

  @Get()
  findAll() {
    return this.bedtypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bedtypeService.findOne(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateBedtypeDto: UpdateBedtypeDto) {
    return this.bedtypeService.update(id, updateBedtypeDto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.bedtypeService.remove(id);
  }
}
