import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoices } from './entities/invoices.entity';
import { InvoiceDetails } from './entities/invoice-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoices, InvoiceDetails])],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
