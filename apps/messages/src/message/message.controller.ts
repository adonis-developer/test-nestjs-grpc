import { Controller, Logger } from '@nestjs/common';
import { MessageService } from './message.service';

import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateMessageDto } from './dto/create-message.dto';
import { DetailMessageService } from '../detail-message/detail-message.service';
import { IMessageModel } from './entities/message.model';
import { v4 as uuidv4 } from 'uuid';
import { DataSource } from 'typeorm';

@Controller()
export class MessageController {
  logger = new Logger(MessageController.name);
  constructor(
    private readonly messageService: MessageService,
    private readonly messageDetailService: DetailMessageService,
    private dataSource: DataSource,
  ) {}

  @EventPattern('message_event')
  async create(
    @Payload() messageDto: CreateMessageDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const messageTarget = await this.messageService.findByCondition(
        queryRunner.manager,
        {
          where: {
            sender: messageDto.sender,
            receiver: messageDto.receiver,
          },
          take: 1,
        },
      );
      if (!messageTarget?.[0]) {
        const id = uuidv4();
        const prepareMessage: IMessageModel = {
          ...messageDto,
          assistantId: '',
          messageId: id,
        };
        await this.messageService.create(queryRunner.manager, prepareMessage);
        await this.messageDetailService.create(queryRunner.manager, {
          ...messageDto,
          messageId: id,
          commission: `{${messageDto.commission.join(',')}}`,
          userIds: `{${messageDto.userIds.join(',')}}`,
        });
      } else {
        await this.messageDetailService.create(queryRunner.manager, {
          ...messageDto,
          messageId: messageTarget?.[0].messageId,
          commission: `{${messageDto.commission.join(',')}}`,
          userIds: `{${messageDto.userIds.join(',')}}`,
        });
      }

      await queryRunner.commitTransaction();
      channel.ack(originalMsg);
    } catch (err) {
      console.log('🚀 ~ MessageController ~ err:', err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return {};
  }

  // @Get()
  // findAll() {
  //   return this.messageService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.messageService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
  //   return this.messageService.update(+id, updateMessageDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.messageService.remove(+id);
  // }
}
