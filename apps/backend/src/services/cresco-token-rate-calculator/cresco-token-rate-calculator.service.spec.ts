import { Test, TestingModule } from '@nestjs/testing';
import { CrescoTokenRateCalculatorService } from './cresco-token-rate-calculator.service';

describe('CrescoTokenRateCalculatorService', () => {
  let service: CrescoTokenRateCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrescoTokenRateCalculatorService],
    }).compile();

    service = module.get<CrescoTokenRateCalculatorService>(CrescoTokenRateCalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
