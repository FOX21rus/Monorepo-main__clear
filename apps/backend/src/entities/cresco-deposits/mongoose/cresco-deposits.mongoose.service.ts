import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  CrescoDepositsMongooseRecord,
  CrescoDepositsRecordDocument,
} from "./cresco-deposits.mongoose.record";
import { Model } from "mongoose";

@Injectable()
export class CrescoDepositsMongooseService {
  constructor(
    @InjectModel(CrescoDepositsMongooseRecord.name)
    public mongoose: Model<CrescoDepositsRecordDocument>
  ) {}
}
