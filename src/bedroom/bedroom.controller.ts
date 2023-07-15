import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BedroomService } from './bedroom.service';
import { CreateBedroomDto } from './dto/create-bedroom.dto';
import { UpdateBedroomDto } from './dto/update-bedroom.dto';

@Controller('bedroom')
export class BedroomController {
  constructor(private readonly bedroomService: BedroomService) {}

  @Post()
  create(@Body() createBedroomDto: CreateBedroomDto) {
    return this.bedroomService.create(createBedroomDto);
  }

  @Get()
  findAll() {
    return this.bedroomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bedroomService.findOne(id);
  }

  @Get('/type/:id')
  findSpecializationOne(@Param('id') id: string) {
    return this.bedroomService.findRoom(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateBedroomDto: UpdateBedroomDto) {
    return this.bedroomService.update(id, updateBedroomDto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.bedroomService.remove(id);
  }
}
