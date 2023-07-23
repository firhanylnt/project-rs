import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceDto } from './dto/create-invoice.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  create(@Body() data: InvoiceDto) {
    return this.invoiceService.store(data);
  }

  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }

  @Get('view/:id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() data: InvoiceDto) {
    return this.invoiceService.update(id, data);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(id);
  }
}
