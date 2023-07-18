import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'room_types',
})
export class Bedtype {
  @PrimaryColumn()
  id: string;

  @Column()
  room_type: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => "NOW()", onUpdate: "NOW()" })
  updated_at: Date;
}
