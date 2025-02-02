import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Role, User } from './types';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  /*
  GET /users
  GET /users/:id
  POST /users
  PATCH /users/:id
  DELETE /users/:id
   */
  @Get()
  async findAll(@Query('role') role?: Role) {
    const users = await this.userService.findAll(role);
    return users;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const userId = Number(id);
      if (typeof userId !== 'number') return 'Not found';
      const user = await this.userService.findOne(userId);
      if (!user) return 'Not found';
      return user;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      } else {
        return 'My server error';
      }
    }
  }

  @Post()
  async create(@Body() user: User) {
    const newUser = await this.userService.create(user);
    return newUser;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() userUpdate: User) {
    const userId = Number(id);
    if (typeof userId !== 'number') return 'Not found';
    const updatedUser = await this.userService.update(userId, userUpdate);
    return updatedUser;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const userId = Number(id);
    if (typeof userId !== 'number') return 'Not found';
    const result = await this.userService.delete(userId);
    return result;
  }
}
