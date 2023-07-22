import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'appointments_v2',
})
export class Appointments {
  @PrimaryColumn()
  id: string;

  @Column()
  specialization_id: number;

  @Column()
  doctor_id: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column()
  patient_name: string;

  @Column()
  patient_gender: string;

  @Column()
  appointment_date: Date;

  @Column()
  description: string;

  @Column()
  is_approved: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => "NOW()", onUpdate: "NOW()" })
  updated_at: Date;
}
