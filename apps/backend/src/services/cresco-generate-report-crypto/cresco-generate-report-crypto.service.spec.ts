import { Test, TestingModule } from '@nestjs/testing';
import { CrescoGenerateReportCryptoService } from './cresco-generate-report-crypto.service';

describe('CrescoGenerateReportCryptoService', () => {
  let service: CrescoGenerateReportCryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrescoGenerateReportCryptoService],
    }).compile();

    service = module.get<CrescoGenerateReportCryptoService>(CrescoGenerateReportCryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
