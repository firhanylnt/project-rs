import { Test, TestingModule } from '@nestjs/testing';
import { BedtypeService } from './bedtype.service';

describe('BedtypeService', () => {
  let service: BedtypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BedtypeService],
    }).compile();

    service = module.get<BedtypeService>(BedtypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
