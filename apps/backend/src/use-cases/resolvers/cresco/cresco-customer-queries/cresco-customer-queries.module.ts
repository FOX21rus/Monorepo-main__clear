import { Module } from '@nestjs/common';
import { CrescoCustomerQueries } from './cresco-customer-queries.resolver';
import { UserEntityModule } from '../../../../entities/user/user.entity.module';
import { CrescoCustomerEntityModule } from '../../../../entities/cresco-customer/cresco-customer.entity.module';
import { CrescoNotificationEntityModule } from '../../../../entities/cresco-notification/cresco-notification.entity.module';
import { CrescoTransactionEntityModule } from '../../../../entities/cresco-transaction/cresco-transaction.entity.module';
import { CrescoPortfolioStateEntityModule } from '../../../../entities/cresco-portfolio-state/cresco-portfolio-state.entity.module';
import { CrescoExternalCoinRateEntityModule } from '../../../../entities/cresco-external-coin-rate/cresco-external-coin-rate.entity.module';
import { CrescoBaseModule } from '../../../cresco/cresco-base/cresco-base.module';
import { CrescoTokenRateEntityModule } from '../../../../entities/cresco-token-rate/cresco-token-rate.entity.module';
import { CrescoPublicationEntityModule } from '../../../../entities/cresco-publication/cresco-publication.entity.module';
import { CrescoTokenRateCalculatorModule } from '../../../../services/cresco-token-rate-calculator/cresco-token-rate-calculator.module';

@Module({
  imports: [
    UserEntityModule,
    CrescoCustomerEntityModule,
    CrescoNotificationEntityModule,
    CrescoTransactionEntityModule,
    CrescoPortfolioStateEntityModule,
    CrescoExternalCoinRateEntityModule,
    CrescoBaseModule,
    CrescoTokenRateEntityModule,
    CrescoPublicationEntityModule,
    CrescoTokenRateCalculatorModule,
  ],
  providers: [CrescoCustomerQueries],
})
export class CrescoCustomerQueriesModule {}
