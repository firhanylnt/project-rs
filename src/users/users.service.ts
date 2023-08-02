import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
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
    const queryBuilder = getConnection()
    .getRepository(Users)
    .createQueryBuilder('u')
    .select([
      'u.id as id',
      'u.hospital_id as hospital_id',
      'u.username as username',
      'u.email as email',
      'u.password as password',
      'u.status as status',
      'u.role as role',
      'u.created_at as created_at',
      'u.updated_at as updated_at',
      'hospital.name as hospital_name', // Use 'hospital.name' instead of 'h.name'
    ])
    .leftJoin('hospitals', 'hospital', 'u.hospital_id = hospital.id')

    if (filterRole !== null && filterRole !== '') {
      queryBuilder.where('u.role = :role', { role: filterRole })
    }

    queryBuilder.orderBy('id', 'DESC')

    return await queryBuilder.getRawMany()
  }

  async store(data: CreateUserDto) {
    const password = bcrypt.hashSync(data.password, bcrypt.genSaltSync());
    const src = new Users();
    src.hospital_id = data.hospital_id;
    src.email = data.email;
    src.password = password;
    src.role = data.role;
    src.username = data.username;

    return await this.repo.save(src);
  }

  async getById(id) {
    const queryBuilder = await getConnection()
    .getRepository(Users)
    .createQueryBuilder('u')
    .select([
      'u.id as id',
      'u.hospital_id as hospital_id',
      'u.username as username',
      'u.email as email',
      'u.password as password',
      'u.status as status',
      'u.role as role',
      'u.created_at as created_at',
      'u.updated_at as updated_at',
      'hospital.name as hospital_name', // Use 'hospital.name' instead of 'h.name'
    ])
    .leftJoin('hospitals', 'hospital', 'u.hospital_id = hospital.id')
    .where('u.id = :id', { id: id })
    .getRawOne()

    return queryBuilder;
  }

  async update(id, data: UpdateUserDto) {
    let src = null;
    if (data.password === null || data.password === '') {
      src = {
        hospital_id: data.hospital_id,
        email: data.email,
        username: data.username,
        role: data.role,
        updated_at: new Date(),
      };
    } else {
      const password = bcrypt.hashSync(data.password, bcrypt.genSaltSync());
      src = {
        hospital_id: data.hospital_id,
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
