import { Test, TestingModule } from '@nestjs/testing';
import { DashamailService } from './dashamail.service';

describe('DashamailService', () => {
  let service: DashamailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashamailService],
    }).compile();

    service = module.get<DashamailService>(DashamailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
