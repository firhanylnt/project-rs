import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { Medicine } from './entities/medicine.entity';

@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(Medicine)
    private readonly repo: Repository<Medicine>,
    private readonly connection2: Connection,
  ) {}

  async getAll() {
    return this.connection2.query(`
      select m.*, mc.category_name as medicine_category_name
      from medicines as m
      left join medicine_categories as mc on m.medicine_category_id = mc.id
      order by m.id desc
    `)
  }

  async store(data: CreateMedicineDto) {
    const src = new Medicine();
    src.medicine_category_id = data.medicine_category_id;
    src.name = data.name;
    src.brand = data.brand;
    src.stock = data.stock;
    src.price = data.price;
    return await this.repo.save(src);
  }

  async getById(id) {
    const queryResult = await this.connection2
      .createQueryBuilder()
      .select('m.*')
      .addSelect('mc.category_name', 'medicine_category_name')
      .from('medicines', 'm')
      .leftJoin('medicine_categories', 'mc', 'm.medicine_category_id = mc.id')
      .where('m.id = :id', { id: id })
      .limit(1)
      .getRawOne();

    return queryResult;
  }

  async update(id, data: UpdateMedicineDto) {
    const src = {
      medicine_category_id: data.medicine_category_id,
      name: data.name,
      brand: data.brand,
      stock: data.stock,
      price: data.price,
      updated_at: new Date(),
    };

    await this.repo.update(id, src);

    return await this.repo.findOne({
      where: { id: id },
    });
  }

  async remove(id) {
    const result = await this.repo.delete({ id: id });
    if (result.affected > 0) return { message: 'Medicine deleted!' };
    else return { message: 'Failed to delete Medicine!' };
  }
}
