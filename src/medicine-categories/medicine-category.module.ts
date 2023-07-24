import { Module } from '@nestjs/common';
import { MedicineCategoryService} from './medicine-category.service';
import { MedicineCategoryController } from './medicine-category.controller';
import { MedicineCategory } from './entities/medicine-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MedicineCategory])],
  controllers: [MedicineCategoryController],
  providers: [MedicineCategoryService],
})
export class MedicineCategoryModule {}
