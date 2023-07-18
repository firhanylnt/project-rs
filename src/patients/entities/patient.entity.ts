import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'patients',
})
export class Patient {
  @PrimaryColumn()
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  gender: string;

  @Column('date') // Use 'date' type for the 'dob' column representing a date
  dob: Date;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => "NOW()", onUpdate: "NOW()" })
  updated_at: Date;
}
