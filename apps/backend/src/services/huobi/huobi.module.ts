import { Module } from '@nestjs/common';
import { HuobiService } from './huobi.service';
import { HuobiResolver } from './huobi.resolver';
import { CrescoExternalCoinRateEntityModule } from '../../entities/cresco-external-coin-rate/cresco-external-coin-rate.entity.module';
import { CrescoExternalCoinRateHistoryEntityModule } from '../../entities/cresco-external-coin-rate-history/cresco-external-coin-rate-history.entity.module';
import { CrescoTokenRateCalculatorModule } from '../cresco-token-rate-calculator/cresco-token-rate-calculator.module';

@Module({
  imports: [
    CrescoExternalCoinRateEntityModule,
    CrescoExternalCoinRateHistoryEntityModule,
    CrescoTokenRateCalculatorModule,
  ],
  providers: [HuobiService, HuobiResolver],
})
export class HuobiModule {}
