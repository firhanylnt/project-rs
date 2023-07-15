import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IpdService } from './ipd.service';
import { CreateIpdDto } from './dto/create-ipd.dto';
import { UpdateIpdDto } from './dto/update-ipd.dto';

@Controller('ipd')
export class IpdController {
  constructor(private readonly ipdService: IpdService) {}

  @Post()
  create(@Body() createIpdDto: CreateIpdDto) {
    return this.ipdService.create(createIpdDto);
  }

  @Get()
  findAll() {
    return this.ipdService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ipdService.findOne(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateIpdDto: UpdateIpdDto) {
    return this.ipdService.update(id, updateIpdDto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.ipdService.remove(id);
  }
}
