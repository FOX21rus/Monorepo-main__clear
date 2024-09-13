import { Module } from '@nestjs/common';
import { CrescoTokenRateEntityService } from './cresco-token-rate.entity.service';
import { CrescoTokenRateMongooseModule } from './mongoose/cresco-token-rate.mongoose.module';

@Module({
  imports: [CrescoTokenRateMongooseModule],
  providers: [CrescoTokenRateEntityService],
  exports: [CrescoTokenRateEntityService],
})
export class CrescoTokenRateEntityModule {}
