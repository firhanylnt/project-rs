import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingDTO } from './dto/create-billing.dto';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post()
  create(@Body() data: BillingDTO) {
    return this.billingService.store(data);
  }

  @Get()
  findAll() {
    return this.billingService.findAll();
  }

  @Get('view/:id')
  findOne(@Param('id') id: string) {
    return this.billingService.findOne(id);
  }

  // @Post(':id')
  // update(@Param('id') id: string, @Body() updateBillingDto: BillingDTO) {
  //   return this.billingService.update(id, updateBillingDto);
  // }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.billingService.remove(id);
  }
}
