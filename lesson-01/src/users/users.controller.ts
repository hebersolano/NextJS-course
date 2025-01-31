import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  /*
  GET /users
  GET /users/:id
  POST /users
  PATCH /users/:id
  DELETE /users/:id
   */
  @Get()
  findAll(@Query('role') role?: 'intern' | 'engineer' | 'admin') {
    console.log('>>>role: ', role);
    return [];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return { id };
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
