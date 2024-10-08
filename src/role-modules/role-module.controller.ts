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
import { RoleModuleService } from './role-module.service';
import { CreateRoleModuleDto } from './dto/create-role-module.dto';
import { UpdateRoleModuleDto } from './dto/update-role-module.dto';

@Controller('role-modules')
export class RoleModuleController {
  constructor(private readonly service: RoleModuleService) {}

  @Post()
  create(@Body() dto: CreateRoleModuleDto) {
    return this.service.store(dto);
  }

  @Get()
  findAll(@Query() query: any) {
    const { hospital_id, role } = query;
    return this.service.getAll(hospital_id, role);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.getById(id);
  }

  @Post(':id')
  update(
    @Param('id') id: number,
    @Body() updateMedicineCatDto: UpdateRoleModuleDto,
  ) {
    return this.service.update(id, updateMedicineCatDto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
