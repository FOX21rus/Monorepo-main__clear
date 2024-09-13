import { Injectable } from '@nestjs/common';
import { CrescoCustomerMongooseService } from './mongoose/cresco-customer.mongoose.service';
import { CrescoCustomerRecordDocument } from './mongoose/cresco-customer.mongoose.record';
import { Model } from 'mongoose';
import { crescoCustomerExamplesFactory } from './examples/cresco-customer.examples';

@Injectable()
export class CrescoCustomerEntityService {
  public mongoose: Model<CrescoCustomerRecordDocument>;
  constructor(
    private readonly crescoCustomerMongooseService: CrescoCustomerMongooseService,
  ) {
    this.mongoose =
      crescoCustomerMongooseService.mongoose as Model<CrescoCustomerRecordDocument>;
  }
  async initData(qty: number) {
    await this.mongoose.deleteMany({});
    await this.mongoose.insertMany(crescoCustomerExamplesFactory(qty));
    return 'ok';
  }
}
