import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Facility } from './entities/facility.entity';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';

@Injectable()
export class FacilityService {
  constructor(
    @InjectRepository(Facility)
    private readonly repo: Repository<Facility>,
    private readonly connection2: Connection,
  ) {}

  async getAll() {
    return this.connection2.query(`
      select * from facilities
      order by id desc
    `);
  }

  async store(data: CreateFacilityDto) {
    const facility = new Facility();
    facility.name = data.name
    facility.price = data.price

    return await this.repo.save(facility);
  }

  async getById(id) {
    const doc = await this.repo.findOne({
      where: { id: id },
    });

    return doc
  }

  async update(id, data: UpdateFacilityDto) {
    const facility = {
      name: data.name,
      price: data.price,
      updated_at: new Date()
    };

    await this.repo.update(id, facility);

    return await this.repo.findOne({
      where: { id: id },
    });
  }

  async remove(id) {
    const result = await this.repo.delete({ id: id });
    if (result.affected > 0) return {'message': 'Facility deleted!'}
    else return {'message': 'Failed to delete Facility!'}
  }
}
