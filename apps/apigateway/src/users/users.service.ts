import {
  AUTH_PACKAGE_NAME,
  CreateUserDto,
  USERS_SERVICE_NAME,
  UpdateUserDto,
  UsersServiceClient,
} from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class UsersService implements OnModuleInit {
  private userServiceClient: UsersServiceClient;

  constructor(@Inject(AUTH_PACKAGE_NAME) private client: ClientGrpc) {}

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
}
