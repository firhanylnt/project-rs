import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Ipd } from './entities/ipd.entity';
import { CreateIpdDto } from './dto/create-ipd.dto';
import { UpdateIpdDto } from './dto/update-ipd.dto';
import { PatientIpdDiagnosis } from './entities/ipd-diagnosis.entity';
import { PatientIpdmedicine } from './entities/ipd-medicine.entity';
import { DiagnosisDTO } from './dto/diagnosis.dto';
import { MedicineDTO } from './dto/medicine.dto';

@Injectable()
export class IpdService {
  constructor(
    @InjectRepository(Ipd)
    private readonly repo: Repository<Ipd>,
    @InjectRepository(PatientIpdDiagnosis)
    private readonly diagnosisRepo: Repository<PatientIpdDiagnosis>,
    @InjectRepository(PatientIpdmedicine)
    private readonly medicineRepo: Repository<PatientIpdmedicine>,
    private readonly connection: Connection,
  ) {}

  // id, patient, room, date, status
  async getAll() {
    return this.connection.query(`
      select pi.id, p.first_name as patient, r.room_number as room, pi.admission_date as date, case when pi.is_active then 'Active' else 'Inactive' end as status from patients_ipd as pi
      inner join patients as p on pi.patient_id = p.id
      inner join rooms as r on pi.room_id = r.id
    `);
  }

  async store(data: CreateIpdDto) {
    const ipd = new Ipd();
    ipd.id = this.generateID(6);
    ipd.patient_id = data.patient_id;
    ipd.room_id = data.room_id;
    ipd.blood_pressure = data.blood_pressure;
    ipd.height = data.height;
    ipd.weight = data.weight;
    ipd.admission_date = data.admission_date;
    ipd.payment_method = data.payment_method;
    ipd.symptoms = data.symptoms;
    ipd.notes = data.notes;
    ipd.is_active = data.is_active;

    return await this.repo.save(ipd);
  }

  async store_diagnosis(id, data: DiagnosisDTO) {
    const diagnosis = new PatientIpdDiagnosis();
    diagnosis.patient_ipd_id = id;
    diagnosis.doctor_id = data.doctor_id;
    diagnosis.diagnosis = data.diagnosis;
    diagnosis.instruction = data.instruction;
    diagnosis.created_by = data.created_by;
    diagnosis.report_date = data.report_date;
    return await this.diagnosisRepo.save(diagnosis);
  }

  async store_medicine(id, data: MedicineDTO) {
    console.log(data);
    const medicine = new PatientIpdmedicine();
    medicine.patient_ipd_id = id;
    medicine.medicine_category = data.medicine_category;
    medicine.medicine_id = data.medicine_id;
    medicine.quantity = data.quantity;
    medicine.dosage = data.dosage;
    medicine.instruction = data.instruction;
    medicine.created_by = data.created_by;
    medicine.report_date = data.report_date;
    return await this.medicineRepo.save(medicine);
  }

  async get_diagnosis_by_ipd(ipd_id) {
    const res = await this.connection
      .createQueryBuilder()
      .select('d.id', 'id')
      .addSelect('dr.name', 'doctor')
      .addSelect('d.diagnosis', 'diagnosis')
      .addSelect('d.instruction', 'instruction')
      .addSelect('d.report_date', 'report_date')
      .from('patients_ipd_diagnosis', 'd')
      .innerJoin('doctors', 'dr', 'dr.id = d.doctor_id')
      .where('d.patient_ipd_id = :id', { id: ipd_id })
      .getRawMany();

    return res;
  }

  async get_medicine_by_ipd(ipd_id) {
    const res = await this.connection
      .createQueryBuilder()
      .select('m.*')
      .addSelect('mc.category_name', 'category_name')
      .addSelect('md.name', 'medicine_name')
      .addSelect('m.report_date', 'report_date')
      .from('patients_ipd_medicine', 'm')
      .leftJoin('medicines', 'md', 'md.id = m.medicine_id')
      .leftJoin('medicine_categories', 'mc', 'mc.id = md.medicine_category_id')
      .where('m.patient_ipd_id = :id', { id: ipd_id })
      .getRawMany();

    return res;
  }

  async getById(id) {
    const queryResult = await this.connection
      .createQueryBuilder()
      .select('i.id', 'id')
      .addSelect('i.patient_id', 'patient_id')
      .addSelect('p.first_name', 'patient_first_name')
      .addSelect('p.last_name', 'patient_last_name')
      .addSelect('p.dob', 'patient_dob')
      .addSelect('i.room_id', 'room_id')
      .addSelect('r.room_number', 'room_number')
      .addSelect('rt.room_type', 'room_type')
      .addSelect('i.blood_pressure', 'blood_pressure')
      .addSelect('i.height', 'height')
      .addSelect('i.weight', 'weight')
      .addSelect('i.admission_date', 'admission_date')
      .addSelect('i.payment_method', 'payment_method')
      .addSelect('i.symptoms', 'symptoms')
      .addSelect('i.notes', 'notes')
      .addSelect('i.is_active', 'is_active')
      .addSelect('i.created_at', 'created_at')
      .addSelect('i.updated_at', 'updated_at')
      .from('patients_ipd', 'i')
      .innerJoin('patients', 'p', 'i.patient_id = p.id')
      .innerJoin('rooms', 'r', 'i.room_id = r.id')
      .innerJoin('room_types', 'rt', 'r.room_type_id = rt.id')
      .where('i.id = :id', { id: id })
      .limit(1)
      .getRawOne();

    return queryResult;
  }

  async update(id, data: UpdateIpdDto) {
    const ipd = {
      patient_id: data.patient_id,
      room_id: data.room_id,
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

    await this.repo.update(id, ipd);

    return await this.repo.findOne({
      where: { id: id },
    });
  }

  async remove(id) {
    const result = await this.repo.delete({ id: id });
    if (result.affected > 0) return { message: 'Patient IPD deleted!' };
    else return { message: 'Failed to delete Patient IPD!' };
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
