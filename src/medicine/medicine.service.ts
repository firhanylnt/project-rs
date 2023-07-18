import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { Medicine } from './entities/medicine.entity';

@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(Medicine)
    private readonly repo: Repository<Medicine>,
  ) {}

  async getAll() {
    return this.repo.find();
  }

  async store(data: CreateMedicineDto) {
    const src = new Medicine();
    src.name = data.name;
    src.brand = data.brand;
    src.stock = data.stock;
    src.price = data.price;
    return await this.repo.save(src);
  }

  async getById(id) {
    const src = await this.repo.findOne({
      where: { id: id },
    });

    return src;
  }

  async update(id, data: UpdateMedicineDto) {
    const src = {
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
