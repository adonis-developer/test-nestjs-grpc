import {
  CreateUserDto,
  PagiantionDto,
  UpdateUserDto,
  User,
  Users,
} from '@app/common';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly users: User[] = [];

  onModuleInit() {
    for (let index = 0; index < 100; index++) {
      this.create({ username: randomUUID(), password: randomUUID(), age: 0 });
    }
  }

  create(createUserDto: CreateUserDto): User {
    const user: User = {
      ...createUserDto,
      subscribed: false,
      socialMedia: {},
      id: randomUUID(),
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return { users: this.users };
  }

  findOne(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    console.log('🚀 ~ UsersService ~ update ~ id:', id);
    console.log(
      '🚀 ~ UsersService ~ update ~ id:',
      this.users.find((user) => user.id == id),
    );
    const userIndex = this.users.findIndex((user) => user.id === id);
    console.log('🚀 ~ UsersService ~ update ~ userIndex:', userIndex);
    if (userIndex !== -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...updateUserDto,
      };
      return this.users[userIndex];
    }

    throw new NotFoundException(`User not found by id ${id}`);
  }

  remove(id: string): User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      return this.users.splice(userIndex, 1)[0];
    }

    throw new NotFoundException(`User not found by id ${id}`);
  }

  queryUsers(
    pagiantionDtoStream: Observable<PagiantionDto>,
  ): Observable<Users> {
    const subject = new Subject<Users>();

    const onNext = (pagination: PagiantionDto) => {
      const start = pagination.page * pagination.skip;
      subject.next({
        users: this.users.splice(start, start + pagination.skip),
      });
    };

    const onComplete = () => subject.complete();

    pagiantionDtoStream.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject.asObservable();
  }
}
