import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { readFileSync, writeFileSync } from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Patient } from 'src/patients/entities/patient.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Patient)
    private readonly repoPatient: Repository<Patient>,
    @InjectRepository(Users)
    private readonly repo: Repository<Users>,
  ) {}

  async register(data: RegisterAuthDto): Promise<object> {
    const res = { success: true, error: null, data: null };

    let exists = await this.repo.findOne({where: {email: data.email,}})
    if (exists !== undefined) {
      res.success = false;
      res.error = 'Email sudah digunakan.'
      return res;
    }

    exists = await this.repo.findOne({where: {username: data.username,}})
    if (exists !== undefined) {
      res.success = false;
      res.error = 'Username sudah digunakan.'
      return res;
    }

    const user = new Users();
    user.username = data.username;
    user.email = data.email;
    user.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync());
    user.status = true;
    user.role = 'Patient'

    const result = await this.repo.save(user);

    const patient = new Patient()
    patient.id = this.generateID(6)
    patient.user_id = user.id
    patient.first_name = data.first_name
    patient.last_name = data.last_name
    patient.gender = data.gender
    patient.dob = data.dob
    patient.phone = data.phone
    patient.address = data.address

    await this.repoPatient.save(patient);

    res.data = result
    return res
  }

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

  generateID(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const charsetLength = charset.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charsetLength);
      result += charset[randomIndex];
    }

    return result;
  }

}
