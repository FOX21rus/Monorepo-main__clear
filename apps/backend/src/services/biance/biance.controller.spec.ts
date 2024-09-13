import { Test, TestingModule } from '@nestjs/testing';
import { BianceController } from './biance.controller';

describe('BianceController', () => {
  let controller: BianceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BianceController],
    }).compile();

    controller = module.get<BianceController>(BianceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
