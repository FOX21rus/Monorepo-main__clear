import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  CrescoExternalCoinRateHistoryMongooseRecord,
  CrescoExternalCoinRateHistoryRecordSchema,
} from "./cresco-external-coin-rate-history.mongoose.record";
import { CrescoExternalCoinRateHistoryMongooseService } from "./cresco-external-coin-rate-history.mongoose.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CrescoExternalCoinRateHistoryMongooseRecord.name,
        schema: CrescoExternalCoinRateHistoryRecordSchema,
      },
    ]),
  ],
  providers: [CrescoExternalCoinRateHistoryMongooseService],
  exports: [CrescoExternalCoinRateHistoryMongooseService],
})
export class CrescoExternalCoinRateHistoryMongooseModule {}
