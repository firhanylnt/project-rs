import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  create(@Body() createAssetDto: CreateAssetDto) {
    return this.assetsService.store(createAssetDto);
  }

  @Get()
  findAll() {
    return this.assetsService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assetsService.getById(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
    return this.assetsService.update(id, updateAssetDto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.assetsService.remove(id);
  }
}
