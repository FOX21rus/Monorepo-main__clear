import { Module } from '@nestjs/common';
import { SenderSmtpService } from './sender-smtp.service';
import {DashamailModule} from "../dashamail/dashamail.module";
import {CrescoCustomerEntityModule} from "../../../entities/cresco-customer/cresco-customer.entity.module";

@Module({
  imports:[DashamailModule,CrescoCustomerEntityModule],
  providers: [SenderSmtpService],
  exports: [SenderSmtpService],
})
export class SenderSmtpModule {}
