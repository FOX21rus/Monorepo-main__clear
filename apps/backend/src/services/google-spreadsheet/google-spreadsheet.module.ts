import { Module } from '@nestjs/common';
import { GoogleSpreadsheetService } from './google-spreadsheet.service';

@Module({
  providers: [GoogleSpreadsheetService],
  exports: [GoogleSpreadsheetService],
})
export class GoogleSpreadsheetModule {}
