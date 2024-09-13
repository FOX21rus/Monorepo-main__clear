import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ObjectType } from "@nestjs/graphql";
//imports

@Schema({ collection: "telegram-message" })
export class TelegramMessageMongooseRecord {
  _id?: string;
  @Prop({ type: Object })
  rawData?: any;
  @Prop({ type: String })
  telegramBotName?: string;
  @Prop({ type: Number })
  telegramChatId?: number;
}

export const TelegramMessageRecordSchema = SchemaFactory.createForClass(
  TelegramMessageMongooseRecord
);
export type TelegramMessageRecordDocument = TelegramMessageMongooseRecord &
  Document;
