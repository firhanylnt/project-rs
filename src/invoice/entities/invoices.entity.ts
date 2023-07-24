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
  type: string;

  @Column()
  invoice_date: Date;

  @Column()
  payment_method: string;

  @Column()
  status: boolean;

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
