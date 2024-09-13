import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  CrescoTransactionMongooseRecord,
  CrescoTransactionRecordDocument,
} from "./cresco-transaction.mongoose.record";
import { Model } from "mongoose";

@Injectable()
export class CrescoTransactionMongooseService {
  constructor(
    @InjectModel(CrescoTransactionMongooseRecord.name)
    public mongoose: Model<CrescoTransactionRecordDocument>
  ) {}
}
