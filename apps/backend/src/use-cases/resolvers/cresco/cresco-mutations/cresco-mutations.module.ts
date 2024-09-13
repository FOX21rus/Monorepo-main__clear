import { Module } from '@nestjs/common';
import { CrescoMutations } from './cresco-mutations.resolver';
import { UserEntityModule } from '../../../../entities/user/user.entity.module';
import { CrescoCustomerEntityModule } from '../../../../entities/cresco-customer/cresco-customer.entity.module';
import { CrescoNotificationEntityModule } from '../../../../entities/cresco-notification/cresco-notification.entity.module';
import { CrescoTransactionEntityModule } from '../../../../entities/cresco-transaction/cresco-transaction.entity.module';
import { CrescoPortfolioStateEntityModule } from '../../../../entities/cresco-portfolio-state/cresco-portfolio-state.entity.module';
import { CrescoExternalCoinRateEntityModule } from '../../../../entities/cresco-external-coin-rate/cresco-external-coin-rate.entity.module';
import { CrescoBaseModule } from '../../../cresco/cresco-base/cresco-base.module';
import { SenderSmtpModule } from '../../../../services/sender/sender-smtp/sender-smtp.module';
import { CrescoExternalCoinRateHistoryEntityModule } from '../../../../entities/cresco-external-coin-rate-history/cresco-external-coin-rate-history.entity.module';
import { CrescoTokenRateEntityModule } from '../../../../entities/cresco-token-rate/cresco-token-rate.entity.module';
import { CrescoTokenRateCalculatorModule } from '../../../../services/cresco-token-rate-calculator/cresco-token-rate-calculator.module';
import { CrescoNotificationsSenderModule } from '../../../../services/cresco-notifications-sender/cresco-notifications-sender.module';
import { CrescoPublicationEntityModule } from '../../../../entities/cresco-publication/cresco-publication.entity.module';

@Module({
  imports: [
    UserEntityModule,
    CrescoCustomerEntityModule,
    CrescoNotificationEntityModule,
    CrescoTransactionEntityModule,
    CrescoPortfolioStateEntityModule,
    CrescoExternalCoinRateEntityModule,
    CrescoExternalCoinRateHistoryEntityModule,
    CrescoTokenRateEntityModule,
    CrescoBaseModule,
    SenderSmtpModule,
    CrescoTokenRateCalculatorModule,
    CrescoNotificationsSenderModule,
    CrescoPublicationEntityModule,
  ],
  providers: [CrescoMutations],
})
export class CrescoMutationsModule {}
