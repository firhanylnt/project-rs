import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'appointments',
})
export class Appointment {
  @PrimaryColumn()
  id: number;

  @Column()
  patient_id: string;

  @Column()
  specialization_id: number;

  @Column()
  doctor_id: string;

  @Column()
  appointment_date: Date;

  @Column()
  payment_method: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => "NOW()", onUpdate: "NOW()" })
  updated_at: Date;
}
