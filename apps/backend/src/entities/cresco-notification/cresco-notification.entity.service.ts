import { Injectable } from '@nestjs/common';
import { CrescoNotificationMongooseService } from './mongoose/cresco-notification.mongoose.service';
import { CrescoNotificationRecordDocument } from './mongoose/cresco-notification.mongoose.record';
import { Model } from 'mongoose';
import { crescoNotificationExamplesFactory } from './examples/cresco-notification.examples';

@Injectable()
export class CrescoNotificationEntityService {
  public mongoose: Model<CrescoNotificationRecordDocument>;
  constructor(
    private readonly crescoNotificationMongooseService: CrescoNotificationMongooseService,
  ) {
    this.mongoose =
      crescoNotificationMongooseService.mongoose as Model<CrescoNotificationRecordDocument>;
  }
  async initData(qty: number) {
    await this.mongoose.deleteMany({});
    await this.mongoose.insertMany(crescoNotificationExamplesFactory(qty));
    return 'ok';
  }
}
