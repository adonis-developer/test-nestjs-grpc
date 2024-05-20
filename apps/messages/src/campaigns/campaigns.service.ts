import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Campaigns } from './entities/campaign.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaigns)
    private readonly campaignRepository: Repository<Campaigns>,
  ) {}
  async create(createCampaignDto: any) {
    const isExist = await this.campaignRepository.findOne({
      where: {
        campaignId: createCampaignDto.campaignId,
      },
    });
    if (isExist) return;
    return await this.campaignRepository.save(createCampaignDto);
  }
}
