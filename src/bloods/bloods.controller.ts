import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BloodsService } from './bloods.service';
import { CreateBloodDto } from './dto/create-blood.dto';
import { UpdateBloodDto } from './dto/update-blood.dto';

@Controller('bloods')
export class BloodsController {
  constructor(private readonly bloodsService: BloodsService) {}

  @Post()
  create(@Body() createBloodDto: CreateBloodDto) {
    return this.bloodsService.store(createBloodDto);
  }

  @Get()
  findAll() {
    return this.bloodsService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bloodsService.getById(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateBloodDto: UpdateBloodDto) {
    return this.bloodsService.update(id, updateBloodDto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.bloodsService.remove(id);
  }
}
