import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dtos/userDto.dto';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findUsers(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async createUser(userData: UserDto): Promise<User> {
    const newUser = this.usersRepository.create({ ...userData });
    const user = await this.usersRepository.save(newUser);
    return user;
  }

  async editUser(id, userData: UserDto): Promise<User> {
    const user = await this.findUserById(id);
    const updatedUser = await this.usersRepository.update(
      { id },
      { ...userData },
    );
    console.log({ updatedUser });

    return user;
  }

  async findUserById(id): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    return user;
  }

  async removeUser(id): Promise<any> {
    await this.usersRepository.delete(id);
    return 'User deleted';
  }
}
