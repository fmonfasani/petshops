import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
