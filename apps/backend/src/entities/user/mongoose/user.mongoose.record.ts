import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ObjectType } from "@nestjs/graphql";
//imports

@Schema({ collection: "user" })
export class UserMongooseRecord {
  _id?: string;
  @Prop({ type: String })
  phone?: string;
  @Prop({ type: [String] })
  phones: string[];
  @Prop({ type: String })
  email?: string;
  @Prop({ type: [String] })
  emails: string[];
  @Prop({ type: String })
  agreementName?: string;
  @Prop({ type: [String] })
  agreementNames: string[];
  @Prop({ type: String })
  signature?: string;
  @Prop({ type: String })
  telegramId?: string;
  @Prop({ type: String })
  telegramIds?: string;
  @Prop({ type: [String] })
  rolesJwt: string[];
  @Prop({ type: [String] })
  roles: string[];
  @Prop({ type: String })
  displayName?: string;
  @Prop({ type: String })
  scope?: string;
  @Prop({ type: String })
  passwordHash?: string;
  @Prop({ type: String })
  otp?: string;
  @Prop({ type: Object })
  otpExpiresAt?: any;
}

export const UserRecordSchema =
  SchemaFactory.createForClass(UserMongooseRecord);
export type UserRecordDocument = UserMongooseRecord & Document;
