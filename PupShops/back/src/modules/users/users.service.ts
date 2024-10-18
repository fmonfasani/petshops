import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }

  async getEmailLogin(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async getUserById(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    return this.getUserById(id);
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
