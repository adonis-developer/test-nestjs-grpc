import { Module } from '@nestjs/common';
import { DetailMessageService } from './detail-message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailMessage } from './entities/detail-message.entity';
import { DetailMessageRepository } from './repositories/detail-message.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DetailMessage])],
  controllers: [],
  providers: [DetailMessageService, DetailMessageRepository],
  exports: [DetailMessageService],
})
export class DetailMessageModule {}
