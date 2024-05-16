import { EntityManager, Repository } from 'typeorm';
import { DetailMessage } from '../entities/detail-message.entity';
import { IDetailMessageModel } from '../entities/detail.message.model';

export class DetailMessageRepository extends Repository<DetailMessage> {
  async saveMessage(
    transactionManager: EntityManager,
    detailMessageDto: IDetailMessageModel,
  ) {
    return await transactionManager
      .getRepository(DetailMessage)
      .save(detailMessageDto);
  }
}
