import { Injectable } from "@nestjs/common";
import { CrescoDepositsMongooseService } from "./mongoose/cresco-deposits.mongoose.service";
import { CrescoDepositsRecordDocument } from "./mongoose/cresco-deposits.mongoose.record";
import { Model } from "mongoose";
import { crescoDepositsExamplesFactory } from "./examples/cresco-deposits.examples";

@Injectable()
export class CrescoDepositsEntityService {
  public mongoose: Model<CrescoDepositsRecordDocument>;
  constructor(
    private readonly crescoDepositsMongooseService: CrescoDepositsMongooseService
  ) {
    this.mongoose =
      crescoDepositsMongooseService.mongoose as Model<CrescoDepositsRecordDocument>;
  }
  async initData(qty: number) {
    await this.mongoose.deleteMany({});
    await this.mongoose.insertMany(crescoDepositsExamplesFactory(qty));
    return "ok";
  }
}
