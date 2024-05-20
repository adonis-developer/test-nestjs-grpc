import { Controller } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @MessagePattern({ cmd: 'sync_campaign' })
  async createCampaign(
    @Payload() campaignPayloadDto: any,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.campaignsService.create(campaignPayloadDto);
      channel.ack(originalMsg);

      return {
        isHandle: true,
      };
    } catch (err) {
      channel.ack(originalMsg);
      return {
        isHandle: false,
      };
    }
  }
}
