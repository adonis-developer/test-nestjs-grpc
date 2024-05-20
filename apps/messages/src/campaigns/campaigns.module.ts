import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaigns } from './entities/campaign.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campaigns])],
  controllers: [CampaignsController],
  providers: [CampaignsService],
})
export class CampaignsModule {}
