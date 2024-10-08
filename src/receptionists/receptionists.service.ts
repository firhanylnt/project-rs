import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateReceptionistDto } from './dto/create-receptionist.dto';
import { UpdateReceptionistDto } from './dto/update-receptionist.dto';
import { Receptionist } from './entities/receptionist.entity';

@Injectable()
export class ReceptionistsService {
  constructor(
    @InjectRepository(Receptionist)
    private readonly repo: Repository<Receptionist>,
    private readonly connection2: Connection,
  ) {}

  async getAll() {
    return this.repo.find();
  }

  async store(data: CreateReceptionistDto) {
    const src = new Receptionist();
    src.user_id = data.user_id;
    src.first_name = data.first_name;
    src.last_name = data.last_name;
    src.dob = data.dob;
    src.gender = data.gender;
    src.phone = data.phone;
    src.address = data.address;

    return await this.repo.save(src);
  }

  async getById(id) {
    const queryResult = await this.connection2
    .createQueryBuilder()
    .select('r.*')
    .addSelect('u.email', 'user')
    .from('receptionist', 'r')
    .innerJoin('users', 'u', 'r.user_id = u.id')
    .where('r.id = :id', { id: id }) 
    .limit(1)
    .getRawOne();

    return queryResult;
  }

  async update(id, data: UpdateReceptionistDto) {
    const src = {
      user_id: data.user_id,
      first_name: data.first_name,
      last_name: data.last_name,
      dob: data.dob,
      gender: data.gender,
      phone: data.phone,
      address: data.address,
      updated_at: new Date(),
    };

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
