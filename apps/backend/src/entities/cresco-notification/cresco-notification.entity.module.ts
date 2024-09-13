import { Module } from '@nestjs/common';
import { CrescoNotificationEntityService } from './cresco-notification.entity.service';
import { CrescoNotificationMongooseModule } from './mongoose/cresco-notification.mongoose.module';

@Module({
  imports: [CrescoNotificationMongooseModule],
  providers: [CrescoNotificationEntityService],
  exports: [CrescoNotificationEntityService],
})
export class CrescoNotificationEntityModule {}
