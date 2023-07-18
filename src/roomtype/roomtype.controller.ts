import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomtypeService } from './roomtype.service';
import { CreateRoomtypeDto } from './dto/create-roomtype.dto';
import { UpdateRoomtypeDto } from './dto/update-roomtype.dto';

@Controller('room-types')
export class RoomtypeController {
  constructor(private readonly bedtypeService: RoomtypeService) {}

  @Post()
  create(@Body() createBedtypeDto: CreateRoomtypeDto) {
    return this.bedtypeService.store(createBedtypeDto);
  }

  @Get()
  findAll() {
    return this.bedtypeService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bedtypeService.getById(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateBedtypeDto: UpdateRoomtypeDto) {
    return this.bedtypeService.update(id, updateBedtypeDto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.bedtypeService.remove(id);
  }
}
