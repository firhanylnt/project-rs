import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly repo: Repository<Room>,
    private readonly connection2: Connection,
  ) {}

  async getAll() {
    return this.connection2.query(`
      select * from rooms
    `);
  }

  async store(data: CreateRoomDto) {
    const room = new Room();
    room.id = this.generateID(6)
    room.room_type_id = data.room_type_id
    room.room_number = data.room_number
    room.slot = data.slot

    return await this.repo.save(room);
  }

  async getById(id) {
    const doc = await this.repo.findOne({
      where: { id: id },
    });

    return doc
  }

  async update(id, data: UpdateRoomDto) {
    const room = {
      room_type_id: data.room_type_id,
      room_number: data.room_number,
      slot: data.slot,
      updated_at: new Date()
    };

    await this.repo.update(id, room);

    return await this.repo.findOne({
      where: { id: id },
    });
  }

  async remove(id) {
    const result = await this.repo.delete({ id: id });
    if (result.affected > 0) return {'message': 'Room deleted!'}
    else return {'message': 'Failed to delete Room!'}
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
