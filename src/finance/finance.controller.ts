import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Post('billing')
  create(@Body() createFinanceDto: CreateFinanceDto) {
    return this.financeService.store_billing(createFinanceDto);
  }

  @Get('billing')
  get_billing() {
    return this.financeService.findAll();
  }

  @Get('invoices')
  get_invoices() {
    return this.financeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.financeService.findOne(+id);
  }

  @Post('billing/:id')
  update(@Param('id') id: string, @Body() updateFinanceDto: UpdateFinanceDto) {
    return this.financeService.update(+id, updateFinanceDto);
  }

  @Post(':id')
  remove(@Param('id') id: string) {
    return this.financeService.remove(+id);
  }
}
