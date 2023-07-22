import { Injectable } from '@nestjs/common';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';

@Injectable()
export class FinanceService {
  store_billing(createFinanceDto: CreateFinanceDto) {
    return 'This action adds a new finance';
  }

  findAll() {
    return `This action returns all finance`;
  }

  findOne(id) {
    return `This action returns a #${id} finance`;
  }

  update(id, updateFinanceDto: UpdateFinanceDto) {
    return `This action updates a #${id} finance`;
  }

  remove(id) {
    return `This action removes a #${id} finance`;
  }
}
