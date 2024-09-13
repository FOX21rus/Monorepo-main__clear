import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ObjectType } from "@nestjs/graphql";
//imports

@Schema({ collection: "cresco-portfolio-state" })
export class CrescoPortfolioStateMongooseRecord {
  _id?: string;
  @Prop({ type: Object })
  createdAt?: any;
  @Prop({ type: Object })
  currenciesAmountsHashmap?: any;
  @Prop({ type: Number })
  crescoTokensOverallAmount?: number;
  @Prop({ type: String })
  createdByUserUri?: string;
}

export const CrescoPortfolioStateRecordSchema = SchemaFactory.createForClass(
  CrescoPortfolioStateMongooseRecord
);
export type CrescoPortfolioStateRecordDocument =
  CrescoPortfolioStateMongooseRecord & Document;
