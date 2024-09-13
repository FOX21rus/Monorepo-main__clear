import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserMongooseRecord, UserRecordDocument } from "./user.mongoose.record";
import { Model } from "mongoose";

@Injectable()
export class UserMongooseService {
  constructor(
    @InjectModel(UserMongooseRecord.name)
    public mongoose: Model<UserRecordDocument>
  ) {}
}
