import { Injectable } from '@nestjs/common';
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

  async store(data) {
    const billing = new Billing();
    billing.code = this.generateID(8);
    billing.patient_id = data.patient_id;
    billing.type = data.type;
    billing.total_amount = data.total_amount;
    billing.billing_date = new Date();

    const bills = await this.billingRepo.save(billing);
    if (bills && bills.id) {
      data.details.map(async (v) => {
        const bill_details = new BillingDetails();
        bill_details.billing_id = bills.id;
        bill_details.item_name = v.item;
        bill_details.quantity = v.qty;
        bill_details.price = v.price;
        bill_details.subtotal = v.subtotal;

        await this.billingDetailsRepo.save(bill_details);
      });
      return true;
    } else {
      return false;
    }
  }

  async findAll() {
    return await this.connection.query(`
      select b.id, concat(p.first_name, ' ', p.last_name) as name, b.code, b.billing_date, b.total_amount, b.type
      from billings b
      join patients p on p.id = b.patient_id
    `);
  }

  async findOne(id) {
    const billing = await this.billingRepo.findOne(id);
    const details = await this.billingDetailsRepo.find({
      where: { billing_id: id },
    });

    return {
      billing: billing,
      details: details,
    };
  }

  async update(id, data) {
    const billing = {
      patient_id: data.patient_id,
      type: data.type,
      total_amount: data.total_amount,
      billing_date: new Date(),
    };

    const bills = await this.billingRepo.update(id, billing);
    if (bills) {
      await this.billingDetailsRepo.delete({ billing_id: id });

      data.details.map(async (v) => {
        const bill_details = new BillingDetails();
        bill_details.billing_id = id;
        bill_details.item_name = v.item;
        bill_details.quantity = v.qty;
        bill_details.price = v.price;
        bill_details.subtotal = v.subtotal;

        await this.billingDetailsRepo.save(bill_details);
      });
      return true;
    } else {
      return false;
    }
  }

  async remove(id) {
    await this.billingRepo.delete(id);
    await this.billingDetailsRepo.delete({ billing_id: id });
    return true;
  }

  generateID(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const charsetLength = charset.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charsetLength);
      result += charset[randomIndex];
    }

    return result;
  }
}
