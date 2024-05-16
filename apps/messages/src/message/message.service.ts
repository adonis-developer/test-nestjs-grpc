import { Injectable } from '@nestjs/common';
import { IMessageModel } from './entities/message.model';
import { MessageRepository } from './repositories/message.repository';
import { EntityManager, FindManyOptions } from 'typeorm';
import { Message } from './entities/message.entity';
@Injectable()
export class MessageService {
  constructor(private messageRepository: MessageRepository) {}
  async create(
    transactionManager: EntityManager,
    createMessageDto: IMessageModel,
  ) {
    return await this.messageRepository.saveMessage(
      transactionManager,
      createMessageDto,
    );
  }

  async findOne(id: string) {
    return await this.messageRepository.findOne({
      where: {
        messageId: id,
      },
    });
  }

  async findByCondition(
    transactionManager: EntityManager,
    condition: FindManyOptions<Message>,
  ) {
    return await this.messageRepository.findByCondition(
      transactionManager,
      condition,
    );
  }

  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} message`;
  // }
}
