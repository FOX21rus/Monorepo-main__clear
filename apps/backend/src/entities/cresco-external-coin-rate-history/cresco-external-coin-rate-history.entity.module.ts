import { Module } from '@nestjs/common';
import { CrescoExternalCoinRateHistoryEntityService } from './cresco-external-coin-rate-history.entity.service';
import { CrescoExternalCoinRateHistoryMongooseModule } from './mongoose/cresco-external-coin-rate-history.mongoose.module';

@Module({
  imports: [CrescoExternalCoinRateHistoryMongooseModule],
  providers: [CrescoExternalCoinRateHistoryEntityService],
  exports: [CrescoExternalCoinRateHistoryEntityService],
})
export class CrescoExternalCoinRateHistoryEntityModule {}
