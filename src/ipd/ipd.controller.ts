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
import { DiagnosisDTO } from './dto/diagnosis.dto';
import { MedicineDTO } from './dto/medicine.dto';

@Controller('ipd')
export class IpdController {
  constructor(private readonly ipdService: IpdService) {}

  @Post()
  create(@Body() createIpdDto: CreateIpdDto) {
    return this.ipdService.store(createIpdDto);
  }

  @Post('add-diagnosis/:id')
  create_diagnosis(@Param('id') id: string, @Body() data: DiagnosisDTO) {
    return this.ipdService.store_diagnosis(id, data);
  }

  @Post('add-medicine/:id')
  create_medicine(@Param('id') id: string, @Body() data: MedicineDTO) {
    return this.ipdService.store_medicine(id, data);
  }

  @Get()
  findAll() {
    return this.ipdService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ipdService.getById(id);
  }

  @Get('detail/:id')
  get_detail(@Param('id') id: string) {
    return this.ipdService.get_detail(id);
  }

  @Get('patient/:id')
  findByUser(@Param('id') id: string) {
    return this.ipdService.getByUser(id);
  }

  @Get('diagnosis/:id')
  get_diagnosis(@Param('id') id: string) {
    return this.ipdService.get_diagnosis_by_ipd(id);
  }

  @Get('medicine/:id')
  get_medicine(@Param('id') id: string) {
    return this.ipdService.get_medicine_by_ipd(id);
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
