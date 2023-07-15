import { Test, TestingModule } from '@nestjs/testing';
import { BedroomController } from './bedroom.controller';
import { BedroomService } from './bedroom.service';

describe('BedroomController', () => {
  let controller: BedroomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BedroomController],
      providers: [BedroomService],
    }).compile();

    controller = module.get<BedroomController>(BedroomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
