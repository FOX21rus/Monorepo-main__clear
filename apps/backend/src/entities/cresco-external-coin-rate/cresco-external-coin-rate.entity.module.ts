import { Module } from '@nestjs/common';
import { CrescoExternalCoinRateEntityService } from './cresco-external-coin-rate.entity.service';
import { CrescoExternalCoinRateMongooseModule } from './mongoose/cresco-external-coin-rate.mongoose.module';

@Module({
  imports: [CrescoExternalCoinRateMongooseModule],
  providers: [CrescoExternalCoinRateEntityService],
  exports: [CrescoExternalCoinRateEntityService],
})
export class CrescoExternalCoinRateEntityModule {}
