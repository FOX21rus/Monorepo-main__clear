import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  CrescoPortfolioStateMongooseRecord,
  CrescoPortfolioStateRecordDocument,
} from "./cresco-portfolio-state.mongoose.record";
import { Model } from "mongoose";

@Injectable()
export class CrescoPortfolioStateMongooseService {
  constructor(
    @InjectModel(CrescoPortfolioStateMongooseRecord.name)
    public mongoose: Model<CrescoPortfolioStateRecordDocument>
  ) {}
}
