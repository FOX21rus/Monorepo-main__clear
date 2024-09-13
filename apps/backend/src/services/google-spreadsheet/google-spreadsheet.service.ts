import { Injectable } from '@nestjs/common';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleSpreadsheetService {
  constructor(private readonly configService: ConfigService) {}
  async getPublicSheet(sheetIdFromUrl: string) {
    const apiKey = this.configService.get('google.apiKey');
    const doc = new GoogleSpreadsheet(sheetIdFromUrl);
    doc.useApiKey(apiKey);
    await doc.loadInfo();
    return doc;
  }
}
