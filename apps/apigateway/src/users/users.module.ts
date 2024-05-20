import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH, AUTH_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH,
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, '../auth.proto'),
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'CLIENT_RMQ',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://feoghlgj:0la1K9IfAhHWAdHJLCh03vpHje4L1mPX@cougar.rmq.cloudamqp.com/feoghlgj',
          ],
          queue: 'message_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'USER_CLIENT_RMQ',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://feoghlgj:0la1K9IfAhHWAdHJLCh03vpHje4L1mPX@cougar.rmq.cloudamqp.com/feoghlgj',
          ],
          queue: 'sync_user',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'CAMPAIGN_CLIENT_RMQ',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://feoghlgj:0la1K9IfAhHWAdHJLCh03vpHje4L1mPX@cougar.rmq.cloudamqp.com/feoghlgj',
          ],
          queue: 'sync_campaign',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
