import { Injectable } from '@nestjs/common';
import { CreateTrmDto } from './dto/create-trm.dto';
import { UpdateTrmDto } from './dto/update-trm.dto';
import { Connection } from 'typeorm';

@Injectable()
export class TrmService {
  constructor(private readonly connection: Connection) {}
  async findAll() {
    return await this.connection.query(`
      select date, type, symptoms, payment_method, blood_pressure, weight, height from (
        select admission_date date, 'OPD' as type, symptoms, payment_method, blood_pressure, weight, height
        from patients_opd
        union all
        select admission_date date, 'IPD' as type, symptoms, payment_method, blood_pressure, weight, height
        from patients_ipd
      )x
    `);
  }

  async findByUser(id) {
    return await this.connection.query(`
      select date, type, symptoms, payment_method, blood_pressure, weight, height from (
        select po.admission_date date, 'OPD' as type, po.symptoms, po.payment_method, po.blood_pressure, po.weight, po.height
        from patients_opd po
        join patients p on p.id = po.patient_id
        where p.user_id = ${id}
        union all
        select pi.admission_date date, 'IPD' as type, pi.symptoms, pi.payment_method, pi.blood_pressure, pi.weight, pi.height
        from patients_ipd pi
        join patients p on p.id = pi.patient_id
        where p.user_id = ${id}
      )x
    `);
  }

  update(id, updateTrmDto: UpdateTrmDto) {
    return `This action updates a #${id} trm`;
  }

  remove(id) {
    return `This action removes a #${id} trm`;
  }
}
