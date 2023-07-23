import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'doctors',
})
export class Doctor {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: number;

  @Column()
  specialization_id: number;

  @Column()
  name: string;

  @Column('date') // Use 'date' type for the 'dob' column representing a date
  dob: Date;

  @Column()
  gender: string;

  @Column()
  phone: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => "NOW()", onUpdate: "NOW()" })
  updated_at: Date;
}
