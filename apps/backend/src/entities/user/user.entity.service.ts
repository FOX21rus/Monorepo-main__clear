import { Injectable } from '@nestjs/common';
import { UserMongooseService } from './mongoose/user.mongoose.service';
import { UserRecordDocument } from './mongoose/user.mongoose.record';
import { Model } from 'mongoose';
import { userExamplesFactory } from './examples/user.examples';

@Injectable()
export class UserEntityService {
  public mongoose: Model<UserRecordDocument>;
  constructor(private readonly userMongooseService: UserMongooseService) {
    this.mongoose = userMongooseService.mongoose as Model<UserRecordDocument>;
  }
  async initData(qty: number) {
    // await this.mongoose.deleteMany({});
    await this.mongoose.insertMany(userExamplesFactory(qty));
    return 'ok';
  }
}
