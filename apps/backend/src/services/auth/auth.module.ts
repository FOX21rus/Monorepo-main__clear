import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntityModule } from '../../entities/user/user.entity.module';
import { AuthResolver } from './auth.resolver';
import { AuthTelegramWebappModule } from '../auth-telegram-webapp/auth-telegram-webapp.module';
import { SenderSmtpModule } from '../sender/sender-smtp/sender-smtp.module';
import { AuthController } from './auth/auth.controller';
import {SenderSmsBytehandModule} from "../sender/sender-sms-bytehand/sender-sms-bytehand.module";
import {CrescoCustomerEntityModule} from "../../entities/cresco-customer/cresco-customer.entity.module";

@Module({
  imports: [UserEntityModule, SenderSmtpModule,SenderSmsBytehandModule, CrescoCustomerEntityModule],
  providers: [AuthService, AuthResolver],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
