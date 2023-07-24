import { Injectable } from '@nestjs/common';
import { Invoices } from './entities/invoices.entity';
import { InvoiceDetails } from './entities/invoice-details.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoices)
    private readonly invoicesRepo: Repository<Invoices>,
    @InjectRepository(InvoiceDetails)
    private readonly InvoiceDetailsRepo: Repository<InvoiceDetails>,
    private readonly connection: Connection,
  ) {}

  async store(data) {
    const invoice = new Invoices();
    invoice.code = this.generateID(8);
    invoice.patient_id = data.patient_id;
    invoice.type = data.type;
    invoice.total_amount = data.total_amount;
    invoice.invoice_date = new Date();
    invoice.status = data.status === 'Pending' ? false : true;
    invoice.payment_method = data.payment_method;

    const inv = await this.invoicesRepo.save(invoice);
    if (inv && inv.id) {
      data.details.map(async (v) => {
        const inv_details = new InvoiceDetails();
        inv_details.invoice_id = inv.id;
        inv_details.item_name = v.item;
        inv_details.quantity = v.qty;
        inv_details.price = v.price;
        inv_details.subtotal = v.subtotal;

        await this.InvoiceDetailsRepo.save(inv_details);
      });
      return true;
    } else {
      return false;
    }
  }

  async findAll() {
    return await this.connection.query(`
      select i.id, concat(p.first_name, ' ', p.last_name) as name, i.code, i.invoice_date, i.total_amount, i.type
      from invoices i
      join patients p on p.id = i.patient_id
    `);
  }

  async findOne(id) {
    const invoice = await this.invoicesRepo.findOne(id);
    const details = await this.InvoiceDetailsRepo.find({
      where: { invoice_id: id },
    });

    return {
      invoice: invoice,
      details: details,
    };
  }

  async findByUser(id) {
    return await this.connection.query(`
    select i.id, concat(p.first_name, ' ', p.last_name) as name, i.code, i.invoice_date, i.total_amount, i.type
    from invoices i
    join patients p on p.id = i.patient_id
    where p.user_id = ${id}
  `);
  }

  async update(id, data) {
    const invoice = {
      patient_id: data.patient_id,
      type: data.type,
      total_amount: data.total_amount,
      status: data.status === 'Pending' ? false : true,
      payment_method: data.payment_method,
      updated_at: new Date(),
    };

    return await this.invoicesRepo.update(id, invoice);
    // if (inv) {
    //   await this.InvoiceDetailsRepo.delete({ invoice_id: id });

    //   data.details.map(async (v) => {
    //     const inv_details = new InvoiceDetails();
    //     inv_details.invoice_id = id;
    //     inv_details.item_name = v.item;
    //     inv_details.quantity = v.qty;
    //     inv_details.price = v.price;
    //     inv_details.subtotal = v.subtotal;

    //     await this.InvoiceDetailsRepo.save(inv_details);
    //   });
    //   return true;
    // } else {
    //   return false;
    // }
  }

  async remove(id) {
    await this.invoicesRepo.delete(id);
    await this.InvoiceDetailsRepo.delete({ invoice_id: id });
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
