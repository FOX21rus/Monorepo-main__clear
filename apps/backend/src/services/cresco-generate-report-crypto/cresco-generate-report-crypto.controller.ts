import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { CrescoGenerateReportCryptoService } from './cresco-generate-report-crypto.service';

@Controller('api/cresco-generate-report')
export class CrescoGenerateReportCryptoController {
  constructor(
    private readonly crescoGenerateReportCryptoService: CrescoGenerateReportCryptoService,
  ) {}
  @Get('crypto/:reportFilename')
  async getReportCrypto(
    @Query('userUri') userUri: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    console.log(userUri);
    return new StreamableFile(
      await this.crescoGenerateReportCryptoService.generateReportCryptoForUserUri(
        userUri,
        from,
        to,
      ),
    );
  }
  @Get('dynamics/:reportFilename')
  async getReportDynamics(
    @Query('userUri') userUri: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    console.log(userUri);
    return new StreamableFile(
      await this.crescoGenerateReportCryptoService.generateReportFundFull(
        userUri,
        from,
        to,
      ),
    );
  }
}
