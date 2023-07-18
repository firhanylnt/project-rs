import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReceptionistsService } from './receptionists.service';
import { CreateReceptionistDto } from './dto/create-receptionist.dto';
import { UpdateReceptionistDto } from './dto/update-receptionist.dto';

@Controller('receptionists')
export class ReceptionistsController {
  constructor(private readonly receptionistsService: ReceptionistsService) {}

  @Post()
  create(@Body() createReceptionistDto: CreateReceptionistDto) {
    return this.receptionistsService.store(createReceptionistDto);
  }

  @Get()
  findAll() {
    return this.receptionistsService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receptionistsService.getById(id);
  }

  @Post(':id')
  update(
    @Param('id') id: string,
    @Body() updateReceptionistDto: UpdateReceptionistDto,
  ) {
    return this.receptionistsService.update(id, updateReceptionistDto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.receptionistsService.remove(id);
  }
}
