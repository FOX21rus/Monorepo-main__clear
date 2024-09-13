import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  CrescoExternalCoinRateHistoryMongooseRecord,
  CrescoExternalCoinRateHistoryRecordDocument,
} from "./cresco-external-coin-rate-history.mongoose.record";
import { Model } from "mongoose";

@Injectable()
export class CrescoExternalCoinRateHistoryMongooseService {
  constructor(
    @InjectModel(CrescoExternalCoinRateHistoryMongooseRecord.name)
    public mongoose: Model<CrescoExternalCoinRateHistoryRecordDocument>
  ) {}
}
