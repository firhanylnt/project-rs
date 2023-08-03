import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'doctor_backgrounds',
})
export class DoctorBackground {
  @PrimaryColumn()
  id: number;

  @Column()
  doctor_id: string;

  @Column()
  year: number;

  @Column()
  education: string;
  
  @Column()
  is_formal: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => "NOW()", onUpdate: "NOW()" })
  updated_at: Date;
}
