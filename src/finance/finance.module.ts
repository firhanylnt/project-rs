import { Module } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Billing } from './entities/billing.entity';
import { Invoices } from './entities/invoices.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Billing, Invoices])],
  controllers: [FinanceController],
  providers: [FinanceService],
})
export class FinanceModule {}
