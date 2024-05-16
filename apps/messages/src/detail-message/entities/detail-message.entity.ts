import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseEntityModel } from '../../common/base.entity';
import { Message } from '../../message/entities/message.entity';
import { IDetailMessageModel } from './detail.message.model';
export enum TypeActionEnum {
  NONE = 'NONE',
  COMMISSION = 'COMMISSION',
  LUCKY_SHAKING = 'LUCKY_SHAKING',
  JOIN_NETWORK = 'JOIN_NETWORK',
}

export enum StatusMessageEnum {
  NONE = 'NONE',
  CLAIMED = 'CLAIMED',
}

export enum ActionMessageEnum {
  NONE = 'NONE',
  CLAIM = 'CLAIM',
  VIEW_MORE = 'VIEW_MORE',
}

@Entity('detail-messages')
export class DetailMessage
  extends BaseEntityModel
  implements IDetailMessageModel
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'message_id' })
  messageId: string;

  @Column({ default: false, type: 'boolean', name: 'is_read' })
  isRead: boolean;

  @Column({
    name: 'action',
    enum: ActionMessageEnum,
    default: ActionMessageEnum.NONE,
  })
  action: string;

  @Column({ name: 'banner_uri', nullable: true, type: 'text' })
  bannerUri: string;

  @Column({ name: 'commission', array: true, nullable: true })
  commission: string;

  /*user_ids look like commission -> also have value when user play event lucky shaking */
  @Column({ name: 'user_ids', array: true, nullable: true })
  userIds: string;

  @Column({
    name: 'type_action',
    enum: TypeActionEnum,
    default: TypeActionEnum.NONE,
  })
  typeAction: string;

  @Column({ name: 'target_user_id', type: 'bigint', nullable: true })
  targetUserId: number;

  @Column({ name: 'ref_user_id', type: 'bigint', nullable: true })
  refUserId: number;

  @Column({ type: 'bigint', nullable: true })
  amount: number;

  @Column({ name: 'content', type: 'text', nullable: true })
  content: string;

  @Column({
    enum: StatusMessageEnum,
    default: StatusMessageEnum.NONE,
  })
  status: string;

  @ManyToOne(() => Message, (messageParent) => messageParent.detailMessage)
  messageParent: Message;
}
