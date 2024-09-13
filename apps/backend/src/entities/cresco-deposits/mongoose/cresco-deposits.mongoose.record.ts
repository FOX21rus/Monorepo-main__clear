import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ObjectType } from "@nestjs/graphql";
//imports

@Schema({ collection: "cresco-deposits" })
export class CrescoDepositsMongooseRecord {
  _id?: string;
  @Prop({ type: String })
  name?: string;
  @Prop({ type: Object })
  payload?: any;
}

export const CrescoDepositsRecordSchema = SchemaFactory.createForClass(
  CrescoDepositsMongooseRecord
);
export type CrescoDepositsRecordDocument = CrescoDepositsMongooseRecord &
  Document;
