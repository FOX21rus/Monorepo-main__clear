import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ObjectType } from "@nestjs/graphql";
//imports

@Schema({ collection: "cresco-notification" })
export class CrescoNotificationMongooseRecord {
  _id?: string;
  @Prop({ type: String })
  userUri: string;
  @Prop({ type: String })
  title?: string;
  @Prop({ type: String })
  text: string;
  @Prop({ type: String })
  cta?: string;
  @Prop({ type: String })
  ctaUrl?: string;
  @Prop({ type: Number })
  emotion?: number;
  @Prop({ type: Object })
  createdAt?: any;
  @Prop({ type: Object })
  isRead?: any;
}

export const CrescoNotificationRecordSchema = SchemaFactory.createForClass(
  CrescoNotificationMongooseRecord
);
export type CrescoNotificationRecordDocument =
  CrescoNotificationMongooseRecord & Document;
