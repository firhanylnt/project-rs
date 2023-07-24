import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'patients_opd_medicine',
})
export class PatientOpdmedicine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patient_opd_id: string;

  @Column()
  medicine_category: number;

  @Column()
  medicine_id: number;

  @Column()
  quantity: number;

  @Column()
  dosage: string;

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
