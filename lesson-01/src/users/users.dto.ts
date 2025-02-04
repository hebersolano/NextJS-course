import { PartialType } from '@nestjs/mapped-types';
import { isEmail } from 'class-validator';

export class User {
  name: string;
  username: string;

  @isEmail()
  email: string;
  role: 'intern' | 'engineer' | 'admin';
}

export class CreateUserDto extends User {}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
