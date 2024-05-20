import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityModel } from '../../common/base.entity';

@Entity('users')
export class Users extends BaseEntityModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: string;
}
