import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  CrescoPublicationMongooseRecord,
  CrescoPublicationRecordDocument,
} from "./cresco-publication.mongoose.record";
import { Model } from "mongoose";

@Injectable()
export class CrescoPublicationMongooseService {
  constructor(
    @InjectModel(CrescoPublicationMongooseRecord.name)
    public mongoose: Model<CrescoPublicationRecordDocument>
  ) {}
}
