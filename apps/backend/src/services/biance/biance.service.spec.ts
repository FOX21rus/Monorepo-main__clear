import { Test, TestingModule } from '@nestjs/testing';
import { BianceService } from './biance.service';

describe('BianceService', () => {
  let service: BianceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BianceService],
    }).compile();

    service = module.get<BianceService>(BianceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
