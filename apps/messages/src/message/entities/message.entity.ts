import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BaseEntityModel } from '../../common/base.entity';
import { DetailMessage } from '../../detail-message/entities/detail-message.entity';
import { IMessageModel } from './message.model';

@Entity('messages')
export class Message extends BaseEntityModel implements IMessageModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'message_id' })
  messageId: string;

  @Column({ name: 'assistant_id', nullable: true })
  assistantId: string;

  @Column()
  sender: string;

  @Column()
  receiver: string;

  @OneToMany(() => DetailMessage, (message) => message.messageParent)
  @JoinColumn({
    foreignKeyConstraintName: 'message_id',
    referencedColumnName: 'message_id',
  })
  detailMessage: DetailMessage;
}
