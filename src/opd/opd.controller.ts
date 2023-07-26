import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OpdService } from './opd.service';
import { CreateOpdDto } from './dto/create-opd.dto';
import { UpdateOpdDto } from './dto/update-opd.dto';
import { MedicineDTO } from './dto/medicine.dto';

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

  @Get('detail/:id')
  get_detail(@Param('id') id: string) {
    return this.opdService.get_detail(id);
  }

  @Get('medicine/:id')
  get_medicine(@Param('id') id: string) {
    return this.opdService.get_medicine_by_opd(id);
  }

  @Get('patient/:id')
  findByUser(@Param('id') id: string) {
    return this.opdService.getByUser(id);
  }

  @Post('add-medicine/:id')
  create_medicine(@Param('id') id: string, @Body() data: MedicineDTO) {
    return this.opdService.store_medicine(id, data);
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
