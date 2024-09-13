import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  CrescoNotificationMongooseRecord,
  CrescoNotificationRecordSchema,
} from "./cresco-notification.mongoose.record";
import { CrescoNotificationMongooseService } from "./cresco-notification.mongoose.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CrescoNotificationMongooseRecord.name,
        schema: CrescoNotificationRecordSchema,
      },
    ]),
  ],
  providers: [CrescoNotificationMongooseService],
  exports: [CrescoNotificationMongooseService],
})
export class CrescoNotificationMongooseModule {}
