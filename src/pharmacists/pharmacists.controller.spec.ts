import { Test, TestingModule } from '@nestjs/testing';
import { PharmacistsController } from './pharmacists.controller';
import { PharmacistsService } from './pharmacists.service';

describe('PharmacistsController', () => {
  let controller: PharmacistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PharmacistsController],
      providers: [PharmacistsService],
    }).compile();

    controller = module.get<PharmacistsController>(PharmacistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
