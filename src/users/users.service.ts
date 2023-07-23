import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly repo: Repository<Users>,
  ) {}

  async getAll(filterRole = null) {
    if (filterRole === null) return this.repo.find();
    else return this.repo.find({
      where: {role: filterRole}
    })
  }

  async store(data: CreateUserDto) {
    const password = bcrypt.hashSync(data.password, bcrypt.genSaltSync());
    const src = new Users();
    src.email = data.email;
    src.password = password;
    src.role = data.role;
    src.username = data.username;

    return await this.repo.save(src);
  }

  async getById(id) {
    const src = await this.repo.findOne({
      where: { id: id },
    });

    return src;
  }

  async update(id, data: UpdateUserDto) {
    let src = null;
    if (data.password === null || data.password === '') {
      src = {
        email: data.email,
        username: data.username,
        role: data.role,
        updated_at: new Date(),
      };
    } else {
      const password = bcrypt.hashSync(data.password, bcrypt.genSaltSync());
      src = {
        email: data.email,
        username: data.username,
        role: data.role,
        password: password,
        updated_at: new Date(),
      };
    }

    await this.repo.update(id, src);

    return await this.repo.findOne({
      where: { id: id },
    });
  }

  async remove(id) {
    const result = await this.repo.delete({ id: id });
    if (result.affected > 0) return { message: 'Receptionist deleted!' };
    else return { message: 'Failed to delete Receptionist!' };
  }
}
