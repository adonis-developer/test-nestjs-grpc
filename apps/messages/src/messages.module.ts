import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageModule } from './message/message.module';
import { Message } from './message/entities/message.entity';
import { DetailMessageModule } from './detail-message/detail-message.module';
import { DetailMessage } from './detail-message/entities/detail-message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456jqk',
      database: 'postgres',
      entities: [Message, DetailMessage],
      migrations: ['src/migrations/*.ts'],
      synchronize: true,
      schema: 'blockchain',
    }),

    MessageModule,
    DetailMessageModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
