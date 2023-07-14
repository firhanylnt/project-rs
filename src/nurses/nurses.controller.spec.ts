import { Test, TestingModule } from '@nestjs/testing';
import { NursesController } from './nurses.controller';
import { NursesService } from './nurses.service';

describe('NursesController', () => {
  let controller: NursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NursesController],
      providers: [NursesService],
    }).compile();

    controller = module.get<NursesController>(NursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
