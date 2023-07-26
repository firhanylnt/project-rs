import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'patients_ipd',
})
export class Ipd {
  @PrimaryColumn()
  id: string;

  @Column()
  patient_id: string;

  @Column()
  doctor_id: string;

  @Column()
  room_id: string;

  @Column()
  blood_pressure: string;

  @Column()
  height: number;

  @Column()
  weight: number;

  @Column()
  admission_date: Date;

  @Column()
  payment_method: string;

  @Column()
  symptoms: string;

  @Column()
  notes: string;

  @Column()
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'NOW()',
    onUpdate: 'NOW()',
  })
  updated_at: Date;
}
