import { Module } from '@nestjs/common';
import { AuthTelegramWebappService } from './auth-telegram-webapp.service';
import { AuthModule } from '../auth/auth.module';
import { AuthTelegramWebappResolver } from './auth-telegram-webapp.resolver';

@Module({
  imports: [AuthModule],
  providers: [AuthTelegramWebappService, AuthTelegramWebappResolver],
})
export class AuthTelegramWebappModule {}
