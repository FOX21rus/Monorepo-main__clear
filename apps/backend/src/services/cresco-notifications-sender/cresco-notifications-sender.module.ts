import { Module } from '@nestjs/common';
import { CrescoNotificationsSenderService } from './cresco-notifications-sender.service';
import { CrescoNotificationEntityModule } from '../../entities/cresco-notification/cresco-notification.entity.module';
import { SenderSmtpModule } from '../sender/sender-smtp/sender-smtp.module';
import {CrescoCustomerEntityModule} from "../../entities/cresco-customer/cresco-customer.entity.module";

@Module({
  imports: [CrescoNotificationEntityModule, SenderSmtpModule,CrescoCustomerEntityModule],
  providers: [CrescoNotificationsSenderService],
  exports: [CrescoNotificationsSenderService],
})
export class CrescoNotificationsSenderModule {}
