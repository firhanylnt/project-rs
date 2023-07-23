import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'invoices',
})
export class Invoices {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  patient_id: string;

  @Column()
  billing_id: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  amount_paid: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  total_amount: number;

  @Column()
  payment_date: Date;

  @Column()
  status: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'NOW()',
    onUpdate: 'NOW()',
  })
  updated_at: Date;
}
