import { Module } from '@nestjs/common';
import { CrescoAdminQueries } from './cresco-admin-queries.resolver';
import { UserEntityModule } from '../../../../entities/user/user.entity.module';
import { CrescoCustomerEntityModule } from '../../../../entities/cresco-customer/cresco-customer.entity.module';
import { CrescoNotificationEntityModule } from '../../../../entities/cresco-notification/cresco-notification.entity.module';
import { CrescoTransactionEntityModule } from '../../../../entities/cresco-transaction/cresco-transaction.entity.module';
import { CrescoPortfolioStateEntityModule } from '../../../../entities/cresco-portfolio-state/cresco-portfolio-state.entity.module';
import {EthCheckTransactionModule} from "../../../../services/eth-check-transaction/eth-check-transaction.module";

@Module({
  imports: [
    UserEntityModule,
    CrescoCustomerEntityModule,
    CrescoNotificationEntityModule,
    CrescoTransactionEntityModule,
    CrescoPortfolioStateEntityModule,
      EthCheckTransactionModule
  ],
  providers: [CrescoAdminQueries],
})
export class CrescoAdminQueriesModule {}
