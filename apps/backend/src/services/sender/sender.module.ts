import { Module } from '@nestjs/common';
import { SenderService } from './sender.service';
import { SenderResolver } from './sender.resolver';
import { SenderSmtpModule } from './sender-smtp/sender-smtp.module';
import {CrescoCustomerEntityModule} from "../../entities/cresco-customer/cresco-customer.entity.module";
import {DashamailModule} from "./dashamail/dashamail.module";

@Module({
  providers: [SenderService, SenderResolver],
  exports: [SenderService],
  imports: [SenderSmtpModule,CrescoCustomerEntityModule,DashamailModule],
})
export class SenderModule {}
