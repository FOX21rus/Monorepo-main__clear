import { Module } from '@nestjs/common';
import { CrescoGenerateReportCryptoService } from './cresco-generate-report-crypto.service';
import { CrescoGenerateReportCryptoController } from './cresco-generate-report-crypto.controller';
import { CrescoTokenRateCalculatorModule } from '../cresco-token-rate-calculator/cresco-token-rate-calculator.module';
import { CrescoCustomerEntityModule } from '../../entities/cresco-customer/cresco-customer.entity.module';

@Module({
  imports: [CrescoTokenRateCalculatorModule, CrescoCustomerEntityModule],
  providers: [CrescoGenerateReportCryptoService],
  controllers: [CrescoGenerateReportCryptoController],
})
export class CrescoGenerateReportCryptoModule {}
