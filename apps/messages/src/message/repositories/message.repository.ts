import { EntityManager, FindManyOptions, Repository } from 'typeorm';
import { Message } from '../entities/message.entity';
import { IMessageModel } from '../entities/message.model';

export class MessageRepository extends Repository<Message> {
  async saveMessage(
    transactionManager: EntityManager,
    createMessageDto: IMessageModel,
  ) {
    return await transactionManager
      .getRepository(Message)
      .save(createMessageDto);
  }

  async findByCondition(
    transactionManager: EntityManager,
    condition: FindManyOptions,
  ) {
    return await transactionManager.getRepository(Message).find(condition);
  }
}
