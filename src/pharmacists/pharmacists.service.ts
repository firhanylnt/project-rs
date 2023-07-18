import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePharmacistDto } from './dto/create-pharmacist.dto';
import { UpdatePharmacistDto } from './dto/update-pharmacist.dto';
import { Pharmacist } from './entities/pharmacist.entity';

@Injectable()
export class PharmacistsService {
  constructor(
    @InjectRepository(Pharmacist)
    private readonly repo: Repository<Pharmacist>,
  ) {}

  async getAll() {
    return this.repo.find();
  }

  async store(data: CreatePharmacistDto) {
    const src = new Pharmacist();
    src.first_name = data.first_name;
    src.last_name = data.last_name;
    src.dob = data.dob;
    src.gender = data.gender;
    src.phone = data.phone;
    src.email = data.email;
    src.address = data.address;

    return await this.repo.save(src);
  }

  async getById(id) {
    const src = await this.repo.findOne({
      where: { id: id },
    });

    return src;
  }

  async update(id, data: UpdatePharmacistDto) {
    const src = {
      first_name: data.first_name,
      last_name: data.last_name,
      dob: data.dob,
      gender: data.gender,
      phone: data.phone,
      email: data.email,
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
    if (result.affected > 0) return { message: 'Pharmacist deleted!' };
    else return { message: 'Failed to delete Pharmacist!' };
  }
}
