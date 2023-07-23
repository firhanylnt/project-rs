import { Injectable } from '@nestjs/common';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Billing } from './entities/billing.entity';
import { BillingDetails } from './entities/billing-details.entity';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Billing)
    private readonly billingRepo: Repository<Billing>,
    @InjectRepository(BillingDetails)
    private readonly billingDetailsRepo: Repository<BillingDetails>,
    private readonly connection: Connection,
  ) {}

  create(data: CreateBillingDto) {
    // const billing = new Billing();
  }

  findAll() {
    return `This action returns all billing`;
  }

  findOne(id) {
    return `This action returns a #${id} billing`;
  }

  update(id, updateBillingDto: UpdateBillingDto) {
    return `This action updates a #${id} billing`;
  }

  remove(id) {
    return `This action removes a #${id} billing`;
  }
}
