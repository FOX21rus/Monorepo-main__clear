import { Injectable } from '@nestjs/common';
import { CrescoTokenRateMongooseService } from './mongoose/cresco-token-rate.mongoose.service';
import { CrescoTokenRateRecordDocument } from './mongoose/cresco-token-rate.mongoose.record';
import { Model } from 'mongoose';
import { crescoTokenRateExamplesFactory } from './examples/cresco-token-rate.examples';

@Injectable()
export class CrescoTokenRateEntityService {
  public mongoose: Model<CrescoTokenRateRecordDocument>;
  constructor(
    private readonly crescoTokenRateMongooseService: CrescoTokenRateMongooseService,
  ) {
    this.mongoose =
      crescoTokenRateMongooseService.mongoose as Model<CrescoTokenRateRecordDocument>;
  }
  async initData(qty: number) {
    await this.mongoose.deleteMany({});
    await this.mongoose.insertMany(crescoTokenRateExamplesFactory(qty));
    return 'ok';
  }
}
