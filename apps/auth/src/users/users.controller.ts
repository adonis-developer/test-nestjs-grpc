import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  FindOneDto,
  PagiantionDto,
  UpdateUserDto,
  UsersServiceController,
  UsersServiceControllerMethods,
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(private readonly usersService: UsersService) {}

  createUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  findAllUsers() {
    return this.usersService.findAll();
  }

  findOne(findOneDto: FindOneDto) {
    return this.usersService.findOne(findOneDto.id);
  }

  updateUser(updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  removeUser(findOneDto: FindOneDto) {
    return this.usersService.remove(findOneDto.id);
  }

  queryUsers(PagiantionDtoStream: Observable<PagiantionDto>) {
    return this.usersService.queryUsers(PagiantionDtoStream);
  }
}
