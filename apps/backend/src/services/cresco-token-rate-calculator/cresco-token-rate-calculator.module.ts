import { Module } from '@nestjs/common';
import { CrescoTokenRateCalculatorService } from './cresco-token-rate-calculator.service';
import { CrescoTokenRateEntityModule } from '../../entities/cresco-token-rate/cresco-token-rate.entity.module';
import { CrescoExternalCoinRateEntityModule } from '../../entities/cresco-external-coin-rate/cresco-external-coin-rate.entity.module';
import { CrescoPortfolioStateEntityModule } from '../../entities/cresco-portfolio-state/cresco-portfolio-state.entity.module';
import { CrescoCustomerEntityModule } from '../../entities/cresco-customer/cresco-customer.entity.module';
import { CrescoTransactionEntityModule } from '../../entities/cresco-transaction/cresco-transaction.entity.module';

@Module({
  imports: [
    CrescoTokenRateEntityModule,
    CrescoExternalCoinRateEntityModule,
    CrescoPortfolioStateEntityModule,
    CrescoCustomerEntityModule,
    CrescoTransactionEntityModule,
  ],
  providers: [CrescoTokenRateCalculatorService],
  exports: [CrescoTokenRateCalculatorService],
})
export class CrescoTokenRateCalculatorModule {}
