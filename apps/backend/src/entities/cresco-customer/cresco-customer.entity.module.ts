import { Module } from '@nestjs/common';
import { CrescoCustomerEntityService } from './cresco-customer.entity.service';
import { CrescoCustomerMongooseModule } from './mongoose/cresco-customer.mongoose.module';

@Module({
  imports: [CrescoCustomerMongooseModule],
  providers: [CrescoCustomerEntityService],
  exports: [CrescoCustomerEntityService],
})
export class CrescoCustomerEntityModule {}
