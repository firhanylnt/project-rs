import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'patients_ipd_diagnosis',
})
export class PatientIpdDiagnosis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patient_ipd_id: string;

  @Column()
  doctor_id: string;

  @Column()
  diagnosis: string;

  @Column()
  instruction: string;

  @Column()
  report_date: string;

  @Column()
  created_by: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'NOW()',
    onUpdate: 'NOW()',
  })
  updated_at: Date;
}
