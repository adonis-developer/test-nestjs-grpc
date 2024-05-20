import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}
  async create(createUserDto: any) {
    const isExist = await this.userRepository.findOne({
      where: {
        userId: createUserDto.userId,
      },
    });
    if (isExist) return;
    return await this.userRepository.save(createUserDto);
  }
}
