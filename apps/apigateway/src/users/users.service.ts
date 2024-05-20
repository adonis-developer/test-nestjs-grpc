import {
  AUTH_PACKAGE_NAME,
  CreateUserDto,
  USERS_SERVICE_NAME,
  UpdateUserDto,
  UsersServiceClient,
} from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private userServiceClient: UsersServiceClient;

  constructor(
    @Inject(AUTH_PACKAGE_NAME) private client: ClientGrpc,
    @Inject('CLIENT_RMQ') private rabbitClient: ClientProxy,
    @Inject('CAMPAIGN_CLIENT_RMQ') private rabbitClientCampaign: ClientProxy,
    @Inject('USER_CLIENT_RMQ') private rabbitClientUser: ClientProxy,
  ) {}

  onModuleInit() {
    this.userServiceClient =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  create(createUserDto: CreateUserDto) {
    return this.userServiceClient.createUser(createUserDto);
  }

  findAll() {
    return this.userServiceClient.findAllUsers({});
  }

  findOne(id: string) {
    return this.userServiceClient.findOne({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userServiceClient.updateUser({ id, ...updateUserDto });
  }

  remove(id: string) {
    return this.userServiceClient.removeUser({ id });
  }

  emitMessage(message: any) {
    console.log('🚀 ~ UsersService ~ emitMessage ~ message:', message);
    this.rabbitClient.emit('message_event', message);
    return { message: 'Gửi tin nhắn thành công' };
  }

  emitCampaign(message: any) {
    console.log('🚀 ~ UsersService ~ emitMessage ~ message:', message);
    const result = this.rabbitClientCampaign
      .send({ cmd: 'sync_campaign' }, message)
      .pipe(map((data) => ({ message: data })));
    return result;
  }

  emitUser(message: any) {
    console.log('🚀 ~ UsersService ~ emitMessage ~ message:', message);
    this.rabbitClientUser.emit('sync_user', message);
    return { message: 'Gửi tin nhắn thành công' };
  }
}
