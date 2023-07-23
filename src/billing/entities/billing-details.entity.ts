import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'billing_details',
})
export class BillingDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  billing_id: number;

  @Column()
  item_name: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  subtotal: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'NOW()',
    onUpdate: 'NOW()',
  })
  updated_at: Date;
}
