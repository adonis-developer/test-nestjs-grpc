import { NestFactory } from '@nestjs/core';
import { MessagesModule } from './messages.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  await app.listen(3000);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://feoghlgj:0la1K9IfAhHWAdHJLCh03vpHje4L1mPX@cougar.rmq.cloudamqp.com/feoghlgj',
      ],
      queue: 'message_queue',
      queueOptions: {
        durable: true,
      },
      noAck: false,
    },
  });

  app.startAllMicroservices();
}
bootstrap();
