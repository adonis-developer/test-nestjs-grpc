import { Injectable } from '@nestjs/common';
import { IDetailMessageModel } from './entities/detail.message.model';
import { DetailMessageRepository } from './repositories/detail-message.repository';
import { EntityManager } from 'typeorm';

@Injectable()
export class DetailMessageService {
  constructor(private detailRepository: DetailMessageRepository) {}
  async create(
    transactionManager: EntityManager,
    detailMessageDto: IDetailMessageModel,
  ) {
    return await this.detailRepository.saveMessage(
      transactionManager,
      detailMessageDto,
    );
  }

  findAll() {
    return `This action returns all detailMessage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailMessage`;
  }

  update(id: string) {
    return `This action updates a #${id} detailMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailMessage`;
  }
}
