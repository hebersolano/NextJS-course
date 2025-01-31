import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Role } from './types';
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
    const userId = Number(id);
    if (typeof userId !== 'number') return 'Not found';
    const user = await this.userService.findOne(userId);
    if (!user) return 'Not found';
    return user;
  }

  @Post()
  create(@Body() user: Record<string, string>) {
    return user;
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() userUpdate: object) {
    return { id, userUpdate };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return { id };
  }
}
