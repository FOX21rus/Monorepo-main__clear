import { Module } from '@nestjs/common';
import { CrescoBaseResolver } from './cresco-base.resolver';
import { CrescoBaseController } from './cresco-base.controller';
import { CrescoBaseService } from './cresco-base.service';
import { CrescoParseReportXlsxModule } from '../../../services/cresco-parse-report-xlsx/cresco-parse-report-xlsx.module';
import {CrescoDeposits} from "../../../schema";
import {CrescoDepositsEntityModule} from "../../../entities/cresco-deposits/cresco-deposits.entity.module";

@Module({
  imports: [CrescoParseReportXlsxModule,CrescoDepositsEntityModule],
  providers: [CrescoBaseResolver, CrescoBaseService],
  controllers: [CrescoBaseController],
  exports: [CrescoBaseService],
})
export class CrescoBaseModule {}
