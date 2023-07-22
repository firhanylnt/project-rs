import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { readFileSync, writeFileSync } from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly repo: Repository<Users>,
  ) {}

  async login(data): Promise<object> {
    const res = { success: true, error: null, data: null };

    if (data.email == null || data.password == null) {
      res.success = false;
      res.error = 'Email atau password tidak boleh kosong.';
      return res;
    }

    const user = await this.repo.findOne({ where: { email: data.email } });
    console.log(user);
    if (user === undefined) {
      res.success = false;
      res.error = 'Akun tidak ditemukan.';
      return res;
    } else {
      if (await bcrypt.compare(data.password, user.password)) {
        res.data = user;
        return res;
      } else {
        res.success = false;
        res.error = 'Password tidak sesuai.';
        return res;
      }
    }
  }
}
