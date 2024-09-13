import { Test, TestingModule } from '@nestjs/testing';
import { CrescoGenerateReportCryptoController } from './cresco-generate-report-crypto.controller';

describe('CrescoGenerateReportCryptoController', () => {
  let controller: CrescoGenerateReportCryptoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrescoGenerateReportCryptoController],
    }).compile();

    controller = module.get<CrescoGenerateReportCryptoController>(CrescoGenerateReportCryptoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
