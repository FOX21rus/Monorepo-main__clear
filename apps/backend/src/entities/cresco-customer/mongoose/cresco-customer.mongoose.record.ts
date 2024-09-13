import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ObjectType } from "@nestjs/graphql";
//imports

@Schema({ collection: "cresco-customer" })
export class CrescoCustomerMongooseRecord {
  _id?: string;
  @Prop({ type: String })
  userUri?: string;
  @Prop({ type: Object })
  isPassportVerified?: any;
  @Prop({ type: String })
  firstName?: string;
  @Prop({ type: String })
  middleName?: string;
  @Prop({ type: String })
  lastName?: string;
  @Prop({ type: String })
  phone?: string;
  @Prop({ type: String })
  managerFullName?: string;
  @Prop({ type: String })
  walletAddress?: string;
  @Prop({ type: Number })
  crescoTokenBalance?: number;
  @Prop({ type: Number })
  overallUSDTInvestments?: number;
  @Prop({ type: [Object] })
  passportScanFiles: any[];
  @Prop({ type: [Object] })
  agreementUrl: any[];
  @Prop({ type: String })
  agreementNo?: string;
  @Prop({ type: [Object] })
  signedAgreementUrl: any[];
  @Prop({ type: Object })
  isPrepared?: any;
}

export const CrescoCustomerRecordSchema = SchemaFactory.createForClass(
  CrescoCustomerMongooseRecord
);
export type CrescoCustomerRecordDocument = CrescoCustomerMongooseRecord &
  Document;
