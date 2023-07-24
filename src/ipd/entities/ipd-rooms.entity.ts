import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'ipd_rooms',
})
export class IpdRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patient_ipd_id: string;

  @Column()
  room_id: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;
}
