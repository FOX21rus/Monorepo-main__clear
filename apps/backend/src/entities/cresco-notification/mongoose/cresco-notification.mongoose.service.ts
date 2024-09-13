import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  CrescoNotificationMongooseRecord,
  CrescoNotificationRecordDocument,
} from "./cresco-notification.mongoose.record";
import { Model } from "mongoose";

@Injectable()
export class CrescoNotificationMongooseService {
  constructor(
    @InjectModel(CrescoNotificationMongooseRecord.name)
    public mongoose: Model<CrescoNotificationRecordDocument>
  ) {}
}
