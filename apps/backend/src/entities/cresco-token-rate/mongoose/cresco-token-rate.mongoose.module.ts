import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  CrescoTokenRateMongooseRecord,
  CrescoTokenRateRecordSchema,
} from "./cresco-token-rate.mongoose.record";
import { CrescoTokenRateMongooseService } from "./cresco-token-rate.mongoose.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CrescoTokenRateMongooseRecord.name,
        schema: CrescoTokenRateRecordSchema,
      },
    ]),
  ],
  providers: [CrescoTokenRateMongooseService],
  exports: [CrescoTokenRateMongooseService],
})
export class CrescoTokenRateMongooseModule {}
