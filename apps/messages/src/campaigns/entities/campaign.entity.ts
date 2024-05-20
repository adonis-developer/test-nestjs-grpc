import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityModel } from '../../common/base.entity';

@Entity('campaigns')
export class Campaigns extends BaseEntityModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ name: 'campaign_id', unique: true })
  campaignId: string;
}
