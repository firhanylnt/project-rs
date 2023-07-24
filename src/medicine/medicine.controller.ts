import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';

@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Post()
  create(@Body() createMedicineDto: CreateMedicineDto) {
    return this.medicineService.store(createMedicineDto);
  }

  @Get()
  findAll() {
    return this.medicineService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicineService.getById(id);
  }

  @Get('category/:id')
  findByCategory(@Param('id') id: string) {
    return this.medicineService.getByCategory(id);
  }

  @Post(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ) {
    return this.medicineService.update(id, updateMedicineDto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.medicineService.remove(id);
  }
}
