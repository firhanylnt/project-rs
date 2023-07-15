import { Test, TestingModule } from '@nestjs/testing';
import { BedtypeController } from './bedtype.controller';
import { BedtypeService } from './bedtype.service';

describe('BedtypeController', () => {
  let controller: BedtypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BedtypeController],
      providers: [BedtypeService],
    }).compile();

    controller = module.get<BedtypeController>(BedtypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
