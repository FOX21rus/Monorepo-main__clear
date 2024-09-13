import { Injectable } from '@nestjs/common';
import { CrescoExternalCoinRateMongooseService } from './mongoose/cresco-external-coin-rate.mongoose.service';
import { CrescoExternalCoinRateRecordDocument } from './mongoose/cresco-external-coin-rate.mongoose.record';
import { Model } from 'mongoose';
import { crescoExternalCoinRateExamplesFactory } from './examples/cresco-external-coin-rate.examples';

@Injectable()
export class CrescoExternalCoinRateEntityService {
  public mongoose: Model<CrescoExternalCoinRateRecordDocument>;
  constructor(
    private readonly crescoExternalCoinRateMongooseService: CrescoExternalCoinRateMongooseService,
  ) {
    this.mongoose =
      crescoExternalCoinRateMongooseService.mongoose as Model<CrescoExternalCoinRateRecordDocument>;
  }
  async initData(qty: number) {
    await this.mongoose.deleteMany({});
    await this.mongoose.insertMany(crescoExternalCoinRateExamplesFactory(qty));
    return 'ok';
  }
}
