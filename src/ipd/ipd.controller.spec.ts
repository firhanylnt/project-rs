import { Test, TestingModule } from '@nestjs/testing';
import { IpdController } from './ipd.controller';
import { IpdService } from './ipd.service';

describe('IpdController', () => {
  let controller: IpdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IpdController],
      providers: [IpdService],
    }).compile();

    controller = module.get<IpdController>(IpdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
