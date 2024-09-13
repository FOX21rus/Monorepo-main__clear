import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  CrescoPublicationMongooseRecord,
  CrescoPublicationRecordSchema,
} from "./cresco-publication.mongoose.record";
import { CrescoPublicationMongooseService } from "./cresco-publication.mongoose.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CrescoPublicationMongooseRecord.name,
        schema: CrescoPublicationRecordSchema,
      },
    ]),
  ],
  providers: [CrescoPublicationMongooseService],
  exports: [CrescoPublicationMongooseService],
})
export class CrescoPublicationMongooseModule {}
