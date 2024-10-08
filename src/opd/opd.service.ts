import { Injectable } from '@nestjs/common';
import { CreateOpdDto } from './dto/create-opd.dto';
import { UpdateOpdDto } from './dto/update-opd.dto';
import { Opd } from './entities/opd.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { MedicineDTO } from './dto/medicine.dto';
import { PatientOpdmedicine } from './entities/opd-medicine.entity';

@Injectable()
export class OpdService {
  constructor(
    @InjectRepository(Opd)
    private readonly repo: Repository<Opd>,
    @InjectRepository(PatientOpdmedicine)
    private readonly medicineRepo: Repository<PatientOpdmedicine>,
    private readonly connection: Connection,
  ) {}

  async getAll() {
    return this.connection.query(`
      select po.id, p.first_name as patient, p.gender, p.dob, po.admission_date as date, case when po.is_active then 'Active' else 'Inactive' end as status from patients_opd as po
      inner join patients as p on po.patient_id = p.id
    `);
  }

  async store(data: CreateOpdDto) {
    const opd = new Opd();
    opd.id = this.generateID(6);
    opd.patient_id = data.patient_id;
    opd.blood_pressure = data.blood_pressure;
    opd.height = data.height;
    opd.weight = data.weight;
    opd.admission_date = data.admission_date;
    opd.payment_method = data.payment_method;
    opd.symptoms = data.symptoms;
    opd.notes = data.notes;
    opd.is_active = data.is_active;

    return await this.repo.save(opd);
  }

  async store_medicine(id, data: MedicineDTO) {
    const medicine = new PatientOpdmedicine();
    medicine.patient_opd_id = id;
    medicine.medicine_category = data.medicine_category;
    medicine.medicine_id = data.medicine_id;
    medicine.quantity = data.quantity;
    medicine.dosage = data.dosage;
    medicine.instruction = data.instruction;
    medicine.created_by = data.created_by;
    medicine.report_date = data.report_date;
    return await this.medicineRepo.save(medicine);
  }

  async getById(id) {
    const queryResult = await this.connection
      .createQueryBuilder()
      .select('o.id', 'id')
      .addSelect('o.patient_id', 'patient_id')
      .addSelect('p.first_name', 'patient_first_name')
      .addSelect('p.last_name', 'patient_last_name')
      .addSelect('p.dob', 'patient_dob')
      .addSelect('o.blood_pressure', 'blood_pressure')
      .addSelect('o.height', 'height')
      .addSelect('o.weight', 'weight')
      .addSelect('o.admission_date', 'admission_date')
      .addSelect('o.payment_method', 'payment_method')
      .addSelect('o.symptoms', 'symptoms')
      .addSelect('o.notes', 'notes')
      .addSelect('o.is_active', 'is_active')
      .addSelect('o.created_at', 'created_at')
      .addSelect('o.updated_at', 'updated_at')
      .from('patients_opd', 'o')
      .innerJoin('patients', 'p', 'o.patient_id = p.id')
      .where('o.id = :id', { id: id })
      .limit(1)
      .getRawOne();

    return queryResult;
  }

  async get_medicine_by_opd(opd_id) {
    const res = await this.connection
      .createQueryBuilder()
      .select('m.*')
      .addSelect('mc.category_name', 'category_name')
      .addSelect('md.name', 'medicine_name')
      .addSelect('m.report_date', 'report_date')
      .from('patients_opd_medicine', 'm')
      .leftJoin('medicines', 'md', 'md.id = m.medicine_id')
      .leftJoin('medicine_categories', 'mc', 'mc.id = md.medicine_category_id')
      .where('m.patient_opd_id = :id', { id: opd_id })
      .getRawMany();

    return res;
  }

  async get_detail(ids) {
    const detail = await this.repo.findOne({ where: { id: ids } });
    const medicine = await this.connection.query(`
      select m.name, m.price, pom.quantity
      from medicines m
      join patients_opd_medicine pom on pom.medicine_id = m.id
      where pom.patient_opd_id = '${ids}'
    `);
    return {
      detail: detail,
      medicine: medicine,
    };
  }

  async getByUser(id) {
    return await this.repo.find({ where: { patient_id: id, is_active: true } });
  }

  async update(id, data: UpdateOpdDto) {
    const opd = {
      patient_id: data.patient_id,
      blood_pressure: data.blood_pressure,
      height: data.height,
      weight: data.weight,
      admission_date: data.admission_date,
      payment_method: data.payment_method,
      symptoms: data.symptoms,
      notes: data.notes,
      is_active: data.is_active,
      updated_at: new Date(),
    };

    await this.repo.update(id, opd);

    return await this.repo.findOne({
      where: { id: id },
    });
  }

  async remove(id) {
    const result = await this.repo.delete({ id: id });
    if (result.affected > 0) return { message: 'Patient opd deleted!' };
    else return { message: 'Failed to delete Patient opd!' };
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
