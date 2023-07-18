import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Roomtype } from './entities/roomtype.entity';
import { CreateRoomtypeDto } from './dto/create-roomtype.dto'; 
import { UpdateRoomtypeDto } from './dto/update-roomtype.dto';

@Injectable()
export class RoomtypeService {
  constructor(
    @InjectRepository(Roomtype)
    private readonly repo: Repository<Roomtype>,
    private readonly connection2: Connection,
  ) {}

  async getAll() {
    return this.connection2.query(`
      select * from room_types
    `);
  }

  async store(data: CreateRoomtypeDto) {
    const roomType = new Roomtype();
    roomType.id = this.generateID(6)
    roomType.room_type = data.room_type

    return await this.repo.save(roomType);
  }

  async getById(id) {
    const doc = await this.repo.findOne({
      where: { id: id },
    });

    return doc
  }

  async update(id, data: UpdateRoomtypeDto) {
    const roomType = {
      room_type: data.room_type,
      updated_at: new Date()
    };

    await this.repo.update(id, roomType);

    return await this.repo.findOne({
      where: { id: id },
    });
  }

  async remove(id) {
    const result = await this.repo.delete({ id: id });
    if (result.affected > 0) return {'message': 'Room Type deleted!'}
    else return {'message': 'Failed to delete Room Type!'}
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
