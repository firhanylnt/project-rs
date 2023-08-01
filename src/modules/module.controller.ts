import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ModuleService } from './module.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Controller('modules')
export class ModuleController {
  constructor(private readonly service: ModuleService) {}

  @Post()
  create(@Body() dto: CreateModuleDto) {
    return this.service.store(dto);
  }

  @Get()
  findAll() {
    return this.service.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.getById(id);
  }

  @Post(':id')
  update(
    @Param('id') id: number,
    @Body() updateMedicineCatDto: UpdateModuleDto,
  ) {
    return this.service.update(id, updateMedicineCatDto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
