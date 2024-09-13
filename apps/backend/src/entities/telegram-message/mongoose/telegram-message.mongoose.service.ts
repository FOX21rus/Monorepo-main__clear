import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  TelegramMessageMongooseRecord,
  TelegramMessageRecordDocument,
} from "./telegram-message.mongoose.record";
import { Model } from "mongoose";

@Injectable()
export class TelegramMessageMongooseService {
  constructor(
    @InjectModel(TelegramMessageMongooseRecord.name)
    public mongoose: Model<TelegramMessageRecordDocument>
  ) {}
}
