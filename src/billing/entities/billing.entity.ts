import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'billings',
})
export class Billing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  patient_id: string;

  @Column()
  type: string;

  @Column()
  billing_date: Date;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  total_amount: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'NOW()',
    onUpdate: 'NOW()',
  })
  updated_at: Date;
}
