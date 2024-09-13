import { Injectable } from '@nestjs/common';
import { CrescoPortfolioStateMongooseService } from './mongoose/cresco-portfolio-state.mongoose.service';
import { CrescoPortfolioStateRecordDocument } from './mongoose/cresco-portfolio-state.mongoose.record';
import { Model } from 'mongoose';
import { crescoPortfolioStateExamplesFactory } from './examples/cresco-portfolio-state.examples';

@Injectable()
export class CrescoPortfolioStateEntityService {
  public mongoose: Model<CrescoPortfolioStateRecordDocument>;
  constructor(
    private readonly crescoPortfolioStateMongooseService: CrescoPortfolioStateMongooseService,
  ) {
    this.mongoose =
      crescoPortfolioStateMongooseService.mongoose as Model<CrescoPortfolioStateRecordDocument>;
  }
  async initData(qty: number) {
    await this.mongoose.deleteMany({});
    await this.mongoose.insertMany(crescoPortfolioStateExamplesFactory(qty));
    return 'ok';
  }
}
