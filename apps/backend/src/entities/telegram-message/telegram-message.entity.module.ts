import { Module } from '@nestjs/common';
import { TelegramMessageEntityService } from './telegram-message.entity.service';
import { TelegramMessageMongooseModule } from './mongoose/telegram-message.mongoose.module';

@Module({
  imports: [TelegramMessageMongooseModule],
  providers: [TelegramMessageEntityService],
  exports: [TelegramMessageEntityService],
})
export class TelegramMessageEntityModule {}
