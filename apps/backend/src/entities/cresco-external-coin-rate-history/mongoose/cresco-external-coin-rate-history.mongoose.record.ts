import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ObjectType } from "@nestjs/graphql";
//imports

@Schema({ collection: "cresco-external-coin-rate-history" })
export class CrescoExternalCoinRateHistoryMongooseRecord {
  _id?: string;
  @Prop({ type: String })
  name?: string;
  @Prop({ type: String })
  displayName?: string;
  @Prop({ type: Number })
  rate?: number;
  @Prop({ type: Object })
  createdAt?: any;
}

export const CrescoExternalCoinRateHistoryRecordSchema =
  SchemaFactory.createForClass(CrescoExternalCoinRateHistoryMongooseRecord);
export type CrescoExternalCoinRateHistoryRecordDocument =
  CrescoExternalCoinRateHistoryMongooseRecord & Document;
