import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrmService } from './trm.service';
import { CreateTrmDto } from './dto/create-trm.dto';
import { UpdateTrmDto } from './dto/update-trm.dto';

@Controller('trm')
export class TrmController {
  constructor(private readonly trmService: TrmService) {}

  @Post()
  create(@Body() createTrmDto: CreateTrmDto) {
    return this.trmService.create(createTrmDto);
  }

  @Get()
  findAll() {
    return this.trmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trmService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrmDto: UpdateTrmDto) {
    return this.trmService.update(+id, updateTrmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trmService.remove(+id);
  }
}
