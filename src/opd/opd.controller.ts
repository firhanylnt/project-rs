import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OpdService } from './opd.service';
import { CreateOpdDto } from './dto/create-opd.dto';
import { UpdateOpdDto } from './dto/update-opd.dto';

@Controller('opd')
export class OpdController {
  constructor(private readonly opdService: OpdService) {}

  @Post()
  create(@Body() createIpdDto: CreateOpdDto) {
    return this.opdService.store(createIpdDto);
  }

  @Get()
  findAll() {
    return this.opdService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opdService.getById(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateOpdDto: UpdateOpdDto) {
    return this.opdService.update(id, updateOpdDto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.opdService.remove(id);
  }
}
