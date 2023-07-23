import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.store(createUserDto);
  }

  @Get()
  findAll(@Query() query: any) {
    const { role } = query;

    return this.usersService.getAll(role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
