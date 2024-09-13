import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ObjectType } from "@nestjs/graphql";
//imports

@Schema({ collection: "cresco-transaction" })
export class CrescoTransactionMongooseRecord {
  _id?: string;
  @Prop({ type: Object })
  transactionType?: any;
  @Prop({ type: String })
  userUri?: string;
  @Prop({ type: Number })
  amountUSDT: number;
  @Prop({ type: Number })
  amountCrescoTokens: number;
  @Prop({ type: Object })
  status?: any;
  @Prop({ type: String })
  fromWallet: string;
  @Prop({ type: String })
  toWallet: string;
  @Prop({ type: Object })
  createdAt: any;
}

export const CrescoTransactionRecordSchema = SchemaFactory.createForClass(
  CrescoTransactionMongooseRecord
);
export type CrescoTransactionRecordDocument = CrescoTransactionMongooseRecord &
  Document;
