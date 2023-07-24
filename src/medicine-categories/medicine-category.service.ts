import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicineCategory } from './entities/medicine-category.entity';
import { CreateMedicineCategoryDto } from './dto/create-medicine-category.dto';
import { UpdateMedicineCategoryDto } from './dto/update-medicine-category.dto';

@Injectable()
export class MedicineCategoryService {
  constructor(
    @InjectRepository(MedicineCategory)
    private readonly repo: Repository<MedicineCategory>,
  ) {}

  async getAll() {
    return this.repo.find();
  }

  async store(data: CreateMedicineCategoryDto) {
    const src = new MedicineCategory();
    src.category_name = data.category_name;
    return await this.repo.save(src);
  }

  async getById(id) {
    const src = await this.repo.findOne({
      where: { id: id },
    });

    return src;
  }

  async update(id, data: UpdateMedicineCategoryDto) {
    const src = {
      category_name: data.category_name,
      updated_at: new Date(),
    };

    await this.repo.update(id, src);

    return await this.repo.findOne({
      where: { id: id },
    });
  }

  async remove(id) {
    const result = await this.repo.delete({ id: id });
    if (result.affected > 0) return { message: 'Medicine Category deleted!' };
    else return { message: 'Failed to delete Medicine Category!' };
  }
}
