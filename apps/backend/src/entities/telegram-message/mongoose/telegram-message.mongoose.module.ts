import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  TelegramMessageMongooseRecord,
  TelegramMessageRecordSchema,
} from "./telegram-message.mongoose.record";
import { TelegramMessageMongooseService } from "./telegram-message.mongoose.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TelegramMessageMongooseRecord.name,
        schema: TelegramMessageRecordSchema,
      },
    ]),
  ],
  providers: [TelegramMessageMongooseService],
  exports: [TelegramMessageMongooseService],
})
export class TelegramMessageMongooseModule {}
