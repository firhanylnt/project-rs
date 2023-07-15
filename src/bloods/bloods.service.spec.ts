import { Test, TestingModule } from '@nestjs/testing';
import { BloodsService } from './bloods.service';

describe('BloodsService', () => {
  let service: BloodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BloodsService],
    }).compile();

    service = module.get<BloodsService>(BloodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
