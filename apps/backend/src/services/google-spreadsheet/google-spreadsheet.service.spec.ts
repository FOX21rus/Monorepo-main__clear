import { Test, TestingModule } from '@nestjs/testing';
import { GoogleSpreadsheetService } from './google-spreadsheet.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../config/configuration';

describe('GoogleSpreadsheetService', () => {
  let service: GoogleSpreadsheetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
          expandVariables: true,
        }),
      ],
      providers: [GoogleSpreadsheetService],
    }).compile();

    service = module.get<GoogleSpreadsheetService>(GoogleSpreadsheetService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();

    const sheets = await service.getPublicSheet(
      '1ae0W_hU7NnRDLGj9mWTkuYiJaBndeGNFNb5cFL0xgOU',
    );

    const sheet = sheets.sheetsByIndex[0];
    const rows = await sheet.getRows().catch(console.log);
    console.log(rows);

    // console.log(JSON.stringify(rows, null, 2));
  });
});
