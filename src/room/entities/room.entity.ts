import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'rooms',
})
export class Room {
  @PrimaryColumn()
  id: string;

  @Column()
  room_type_id: string;

  @Column()
  room_number: string;

  @Column()
  slot: number;

  @Column()
  price: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => "NOW()", onUpdate: "NOW()" })
  updated_at: Date;
}
