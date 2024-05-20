import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern('sync_user')
  async createUser(
    @Payload() campaignPayloadDto: any,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.usersService.create(campaignPayloadDto);
      channel.ack(originalMsg);
    } catch (err) {
      console.log('🚀 ~ UsersController ~ err:', err);
    }
  }
}
