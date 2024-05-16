import { Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

export class BaseEntityModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'deleted_at',
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  deletedAt: Date;

  @Column({ name: 'is_deleted', type: 'boolean', default: false })
  isDeleted: Date;

  @Column({
    name: 'updated_at',
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({
    name: 'created_at',
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
