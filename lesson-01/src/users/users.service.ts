import { Injectable } from '@nestjs/common';
import { Role, User, Users } from './types';
import { readJsonFile, updateFile } from 'src/lib/utils';

@Injectable()
export class UsersService {
  private users: Users | undefined;

  private async getUsers() {
    if (!this.users) {
      return (this.users = await readJsonFile<Users>('src/users/users.json'));
    }
    return this.users;
  }

  private async updateUsers(users: Users) {
    if (!users) throw new Error('Users not found');
    await updateFile('src/users/users.json', JSON.stringify(users));
  }

  async findAll(role?: Role) {
    const users = await this.getUsers();
    if (!users) throw new Error('Users not found');

    if (role) {
      return users?.filter((user) => user.role === role);
    }

    return users;
  }

  async findOne(id: number) {
    const users = await this.getUsers();
    const user = users?.filter((user) => user.id === id);
    if (!user) return undefined;
    return user;
  }

  async create(user: User) {
    const users = await this.getUsers();
    if (!users) return 'Error finding users';
    await this.updateUsers(users.push(user));
    return user;
  }

  async update(id: number, user: User) {
    const users = await this.getUsers();
    if (!users) return undefined;
    const userIndex = users?.findIndex((user) => user.id === id);
    if (!userIndex || userIndex < 0) return undefined;
    users[userIndex] = { ...users[userIndex], ...user };
    this.updateUsers(users);
  }
}
