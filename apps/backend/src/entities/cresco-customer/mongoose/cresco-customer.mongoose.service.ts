import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  CrescoCustomerMongooseRecord,
  CrescoCustomerRecordDocument,
} from "./cresco-customer.mongoose.record";
import { Model } from "mongoose";

@Injectable()
export class CrescoCustomerMongooseService {
  constructor(
    @InjectModel(CrescoCustomerMongooseRecord.name)
    public mongoose: Model<CrescoCustomerRecordDocument>
  ) {}
}
