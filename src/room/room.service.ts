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

  async getAll(roomType = null) {
    return this.connection2.query(`
      select r.id, r.room_number as number, rt.room_type as type, r.slot, r.price from rooms as r
      left join room_types as rt on r.room_type_id = rt.id
      ${roomType !== null ? `where rt.room_type = '${roomType}'` : ``}
    `);
  }

  async store(data: CreateRoomDto) {
    const room = new Room();
    room.id = this.generateID(6)
    room.room_type_id = data.room_type_id
    room.room_number = data.room_number
    room.slot = data.slot
    room.price = data.price

    return await this.repo.save(room);
  }

  async getById(id) {
    const queryResult = await this.connection2
    .createQueryBuilder()
    .select('r.id', 'id')
    .addSelect('r.room_number', 'number')
    .addSelect('r.slot', 'slot')
    .addSelect('r.price', 'price')
    .addSelect('rt.room_type', 'type')
    .addSelect('rt.id', 'room_type_id')
    .from('rooms', 'r')
    .leftJoin('room_types', 'rt', 'r.room_type_id = rt.id')
    .where('r.id = :id', { id: id }) 
    .limit(1)
    .getRawOne();

    return queryResult;
  }

  async update(id, data: UpdateRoomDto) {
    const room = {
      room_type_id: data.room_type_id,
      room_number: data.room_number,
      slot: data.slot,
      price: data.price,
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
