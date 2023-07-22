import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OpdService } from './opd.service';
import { CreateOpdDto } from './dto/create-opd.dto';
import { UpdateOpdDto } from './dto/update-opd.dto';

@Controller('opd')
export class OpdController {
  constructor(private readonly opdService: OpdService) {}

  @Post()
  create(@Body() createOpdDto: CreateOpdDto) {
    return this.opdService.create(createOpdDto);
  }

  @Get()
  findAll() {
    return this.opdService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opdService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOpdDto: UpdateOpdDto) {
    return this.opdService.update(+id, updateOpdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opdService.remove(+id);
  }
}
