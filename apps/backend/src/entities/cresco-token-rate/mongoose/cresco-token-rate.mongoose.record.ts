import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ObjectType } from "@nestjs/graphql";
//imports

@Schema({ collection: "cresco-token-rate" })
export class CrescoTokenRateMongooseRecord {
  _id?: string;
  @Prop({ type: Object })
  ts: any;
  @Prop({ type: Number })
  rateUSDT: number;
  @Prop({ type: Number })
  crescoTokensAmount: number;
}

export const CrescoTokenRateRecordSchema = SchemaFactory.createForClass(
  CrescoTokenRateMongooseRecord
);
export type CrescoTokenRateRecordDocument = CrescoTokenRateMongooseRecord &
  Document;
