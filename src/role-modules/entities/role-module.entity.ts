import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'role_modules',
})
export class RoleModule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  module_id: number;

  @Column()
  hospital_id: number;

  @Column()
  role: string;

  @Column()
  is_visible: boolean;

  @Column()
  is_create: boolean;

  @Column()
  is_read: boolean;

  @Column()
  is_edit: boolean;

  @Column()
  is_delete: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
