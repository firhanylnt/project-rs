import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Billing } from './entities/billing.entity';
import { BillingDetails } from './entities/billing-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Billing, BillingDetails])],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
