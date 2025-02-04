import { Injectable } from '@nestjs/common';
import { readJsonFile, updateFile } from 'src/lib/utils';
import { Role, Users } from './types';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  private users: Users;

  private async getUsers() {
    if (!this.users) {
      const users = await readJsonFile<Users>('src/users/users.json');
      if (!users || !(users instanceof Array))
        throw new Error("Error reading users' database");
      this.users = users;
    }
    return this.users;
  }

  private async updateUsers(users: Users) {
    await updateFile('src/users/users.json', JSON.stringify(users));
    this.users = users;
  }

  async findAll(role?: Role) {
    const users = await this.getUsers();

    if (role) {
      return users.filter((user) => user.role === role);
    }

    return users;
  }

  async findOne(id: number) {
    const users = await this.getUsers();
    console.log('find one users', users);
    const user = users?.find((user) => user.id === id);
    if (!user) throw new Error('User not found');
    return user;
  }

  async create(user: CreateUserDto) {
    const users = await this.getUsers();
    const id = users[users.length - 1].id + 1;
    const newUser = { ...user, id };
    users.push(newUser);
    await this.updateUsers(users);
    return newUser;
  }

  async update(id: number, user: UpdateUserDto) {
    const users = await this.getUsers();
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) throw new Error('User not found');
    const oldUser = users[index];
    users[index] = { ...oldUser, ...user, id: oldUser.id };
    await this.updateUsers(users);
    return users[index];
  }

  async delete(id: number) {
    try {
      const users = await this.getUsers();
      const newUsers = users.filter((user) => user.id !== id);
      await this.updateUsers(newUsers);
      return true;
    } catch (error) {
      console.error('>>> user delete service error:', error);
      return false;
    }
  }
}
