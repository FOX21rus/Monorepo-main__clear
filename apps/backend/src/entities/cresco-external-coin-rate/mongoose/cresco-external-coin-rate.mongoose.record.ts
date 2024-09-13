import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ObjectType } from "@nestjs/graphql";
//imports

@Schema({ collection: "cresco-external-coin-rate" })
export class CrescoExternalCoinRateMongooseRecord {
  _id?: string;
  @Prop({ type: String })
  name?: string;
  @Prop({ type: String })
  displayName?: string;
  @Prop({ type: Number })
  rate?: number;
}

export const CrescoExternalCoinRateRecordSchema = SchemaFactory.createForClass(
  CrescoExternalCoinRateMongooseRecord
);
export type CrescoExternalCoinRateRecordDocument =
  CrescoExternalCoinRateMongooseRecord & Document;
