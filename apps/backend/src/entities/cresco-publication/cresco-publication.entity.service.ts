import { Injectable } from '@nestjs/common';
import { CrescoPublicationMongooseService } from './mongoose/cresco-publication.mongoose.service';
import { CrescoPublicationRecordDocument } from './mongoose/cresco-publication.mongoose.record';
import { Model } from 'mongoose';
import { crescoPublicationExamplesFactory } from './examples/cresco-publication.examples';

@Injectable()
export class CrescoPublicationEntityService {
  public mongoose: Model<CrescoPublicationRecordDocument>;
  constructor(
    private readonly crescoPublicationMongooseService: CrescoPublicationMongooseService,
  ) {
    this.mongoose =
      crescoPublicationMongooseService.mongoose as Model<CrescoPublicationRecordDocument>;
  }
  async initData(qty: number) {
    await this.mongoose.deleteMany({});
    await this.mongoose.insertMany(crescoPublicationExamplesFactory(qty));
    return 'ok';
  }
}
