import { Injectable } from '@nestjs/common';
import { CrescoExternalCoinRateHistoryMongooseService } from './mongoose/cresco-external-coin-rate-history.mongoose.service';
import { CrescoExternalCoinRateHistoryRecordDocument } from './mongoose/cresco-external-coin-rate-history.mongoose.record';
import { Model } from 'mongoose';
import { crescoExternalCoinRateHistoryExamplesFactory } from './examples/cresco-external-coin-rate-history.examples';

@Injectable()
export class CrescoExternalCoinRateHistoryEntityService {
  public mongoose: Model<CrescoExternalCoinRateHistoryRecordDocument>;
  constructor(
    private readonly crescoExternalCoinRateHistoryMongooseService: CrescoExternalCoinRateHistoryMongooseService,
  ) {
    this.mongoose =
      crescoExternalCoinRateHistoryMongooseService.mongoose as Model<CrescoExternalCoinRateHistoryRecordDocument>;
  }
  async initData(qty: number) {
    await this.mongoose.deleteMany({});
    await this.mongoose.insertMany(
      crescoExternalCoinRateHistoryExamplesFactory(qty),
    );
    return 'ok';
  }
}
