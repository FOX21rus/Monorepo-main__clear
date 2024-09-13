import { Module } from '@nestjs/common';
import { CrescoParseReportXlsxService } from './cresco-parse-report-xlsx.service';
import { CrescoTokenRateCalculatorModule } from '../cresco-token-rate-calculator/cresco-token-rate-calculator.module';
import {CrescoDepositsEntityModule} from "../../entities/cresco-deposits/cresco-deposits.entity.module";
import {UserEntityModule} from "../../entities/user/user.entity.module";

@Module({
  imports:[CrescoDepositsEntityModule,UserEntityModule],
  providers: [CrescoParseReportXlsxService, CrescoTokenRateCalculatorModule],
  exports: [CrescoParseReportXlsxService],
})
export class CrescoParseReportXlsxModule {}
