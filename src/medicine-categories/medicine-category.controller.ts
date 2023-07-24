import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicineCategoryService } from './medicine-category.service';
import { CreateMedicineCategoryDto } from './dto/create-medicine-category.dto';
import { UpdateMedicineCategoryDto } from './dto/update-medicine-category.dto';

@Controller('medicine-categories')
export class MedicineCategoryController {
  constructor(private readonly medicineCatService: MedicineCategoryService) {}

  @Post()
  create(@Body() createMedicineCatDto: CreateMedicineCategoryDto) {
    return this.medicineCatService.store(createMedicineCatDto);
  }

  @Get()
  findAll() {
    return this.medicineCatService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicineCatService.getById(id);
  }

  @Post(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicineCatDto: UpdateMedicineCategoryDto,
  ) {
    return this.medicineCatService.update(id, updateMedicineCatDto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.medicineCatService.remove(id);
  }
}
