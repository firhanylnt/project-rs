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
  constructor(private readonly roomtypeService: RoomtypeService) {}

  @Post()
  create(@Body() createRoomtypeDto: CreateRoomtypeDto) {
    return this.roomtypeService.store(createRoomtypeDto);
  }

  @Get()
  findAll() {
    return this.roomtypeService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomtypeService.getById(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateBedtypeDto: UpdateRoomtypeDto) {
    return this.roomtypeService.update(id, updateBedtypeDto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.roomtypeService.remove(id);
  }
}
