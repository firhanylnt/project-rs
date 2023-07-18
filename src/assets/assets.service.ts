import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { Assets } from './entities/asset.entity';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Assets)
    private readonly repo: Repository<Assets>,
  ) {}

  async getAll() {
    return this.repo.find();
  }

  async store(data: CreateAssetDto) {
    const src = new Assets();
    src.name = data.name;
    src.brand = data.brand;
    src.stock = data.stock;
    src.price = data.price;
    src.description = data.description;
    return await this.repo.save(src);
  }

  async getById(id) {
    const src = await this.repo.findOne({
      where: { id: id },
    });

    return src;
  }

  async update(id, data: UpdateAssetDto) {
    const src = {
      name: data.name,
      brand: data.brand,
      stock: data.stock,
      price: data.price,
      description: data.description,
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
