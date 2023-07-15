import { Test, TestingModule } from '@nestjs/testing';
import { ReceptionistsController } from './receptionists.controller';
import { ReceptionistsService } from './receptionists.service';

describe('ReceptionistsController', () => {
  let controller: ReceptionistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceptionistsController],
      providers: [ReceptionistsService],
    }).compile();

    controller = module.get<ReceptionistsController>(ReceptionistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
