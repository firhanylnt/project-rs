import { Test, TestingModule } from '@nestjs/testing';
import { BloodsController } from './bloods.controller';
import { BloodsService } from './bloods.service';

describe('BloodsController', () => {
  let controller: BloodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BloodsController],
      providers: [BloodsService],
    }).compile();

    controller = module.get<BloodsController>(BloodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
