import { Module } from '@nestjs/common';
import { CrescoTransactionEntityService } from './cresco-transaction.entity.service';
import { CrescoTransactionMongooseModule } from './mongoose/cresco-transaction.mongoose.module';

@Module({
  imports: [CrescoTransactionMongooseModule],
  providers: [CrescoTransactionEntityService],
  exports: [CrescoTransactionEntityService],
})
export class CrescoTransactionEntityModule {}
