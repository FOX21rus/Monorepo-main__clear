import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  CrescoExternalCoinRateMongooseRecord,
  CrescoExternalCoinRateRecordDocument,
} from "./cresco-external-coin-rate.mongoose.record";
import { Model } from "mongoose";

@Injectable()
export class CrescoExternalCoinRateMongooseService {
  constructor(
    @InjectModel(CrescoExternalCoinRateMongooseRecord.name)
    public mongoose: Model<CrescoExternalCoinRateRecordDocument>
  ) {}
}
