import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.store(createRoomDto);
  }

  @Get()
  findAll(@Query() query: any) {
    const { roomType } = query;
    return this.roomService.getAll(roomType);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.getById(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(id);
  }
}
