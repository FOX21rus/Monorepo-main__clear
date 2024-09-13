import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  CrescoTokenRateMongooseRecord,
  CrescoTokenRateRecordDocument,
} from "./cresco-token-rate.mongoose.record";
import { Model } from "mongoose";

@Injectable()
export class CrescoTokenRateMongooseService {
  constructor(
    @InjectModel(CrescoTokenRateMongooseRecord.name)
    public mongoose: Model<CrescoTokenRateRecordDocument>
  ) {}
}
