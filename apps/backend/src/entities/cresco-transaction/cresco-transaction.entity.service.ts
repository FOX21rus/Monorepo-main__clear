import { Injectable } from '@nestjs/common';
import { CrescoTransactionMongooseService } from './mongoose/cresco-transaction.mongoose.service';
import { CrescoTransactionRecordDocument } from './mongoose/cresco-transaction.mongoose.record';
import { Model } from 'mongoose';
import { crescoTransactionExamplesFactory } from './examples/cresco-transaction.examples';

@Injectable()
export class CrescoTransactionEntityService {
  public mongoose: Model<CrescoTransactionRecordDocument>;
  constructor(
    private readonly crescoTransactionMongooseService: CrescoTransactionMongooseService,
  ) {
    this.mongoose =
      crescoTransactionMongooseService.mongoose as Model<CrescoTransactionRecordDocument>;
  }
  async initData(qty: number) {
    await this.mongoose.deleteMany({});
    await this.mongoose.insertMany(crescoTransactionExamplesFactory(qty));
    return 'ok';
  }
}
