import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ObjectType } from "@nestjs/graphql";
//imports

@Schema({ collection: "cresco-publication" })
export class CrescoPublicationMongooseRecord {
  _id?: string;
  @Prop({ type: String })
  id: string;
  @Prop({ type: String })
  title: string;
  @Prop({ type: String })
  text: string;
  @Prop({ type: [Object] })
  imageUrl: any[];
  @Prop({ type: Object })
  createdAt?: any;
}

export const CrescoPublicationRecordSchema = SchemaFactory.createForClass(
  CrescoPublicationMongooseRecord
);
export type CrescoPublicationRecordDocument = CrescoPublicationMongooseRecord &
  Document;
