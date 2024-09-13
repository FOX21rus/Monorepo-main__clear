import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  CrescoExternalCoinRateMongooseRecord,
  CrescoExternalCoinRateRecordSchema,
} from "./cresco-external-coin-rate.mongoose.record";
import { CrescoExternalCoinRateMongooseService } from "./cresco-external-coin-rate.mongoose.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CrescoExternalCoinRateMongooseRecord.name,
        schema: CrescoExternalCoinRateRecordSchema,
      },
    ]),
  ],
  providers: [CrescoExternalCoinRateMongooseService],
  exports: [CrescoExternalCoinRateMongooseService],
})
export class CrescoExternalCoinRateMongooseModule {}
