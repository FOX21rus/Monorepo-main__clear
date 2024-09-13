import { Injectable } from '@nestjs/common';
import { TelegramMessageMongooseService } from './mongoose/telegram-message.mongoose.service';
import { TelegramMessageRecordDocument } from './mongoose/telegram-message.mongoose.record';
import { Model } from 'mongoose';
import { telegramMessageExamplesFactory } from './examples/telegram-message.examples';

@Injectable()
export class TelegramMessageEntityService {
  public mongoose: Model<TelegramMessageRecordDocument>;
  constructor(
    private readonly telegramMessageMongooseService: TelegramMessageMongooseService,
  ) {
    this.mongoose =
      telegramMessageMongooseService.mongoose as Model<TelegramMessageRecordDocument>;
  }
  async initData(qty: number) {
    await this.mongoose.deleteMany({});
    await this.mongoose.insertMany(telegramMessageExamplesFactory(qty));
    return 'ok';
  }
}
