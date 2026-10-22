import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserDto } from 'src/dtos/userDto.dto';
import { User } from 'src/typeorm/entities/User';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.findUsers();
  }

  @Post()
  createUser(@Body() userDto: UserDto): Promise<User> {
    return this.userService.createUser(userDto);
  }

  @Patch(':id')
  updateUser(@Param() param, @Body() userDto: UserDto): Promise<User> {
    return this.userService.editUser(param.id, userDto);
  }

  @Get(':id')
  findUser(@Param() parm): Promise<User> {
    return this.userService.findUserById(parm.id);
  }

  @Delete(':id')
  deleteUser(@Param() param): any {
    return this.userService.removeUser(param.id);
  }
}
