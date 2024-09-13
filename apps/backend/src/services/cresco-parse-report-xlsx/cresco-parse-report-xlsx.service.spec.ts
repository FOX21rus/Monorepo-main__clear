import { Test, TestingModule } from '@nestjs/testing';
import { CrescoParseReportXlsxService } from './cresco-parse-report-xlsx.service';

describe('CrescoParseReportXlsxService', () => {
  let service: CrescoParseReportXlsxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrescoParseReportXlsxService],
    }).compile();

    service = module.get<CrescoParseReportXlsxService>(CrescoParseReportXlsxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should parse file', () => {
    service.parseLocalFile('/Users/nickerlan/dev/javascript/protos/next-nest-gql/apps/backend/src/services/cresco-parse-report-xlsx/examples/example.xlsx');
  });
});
