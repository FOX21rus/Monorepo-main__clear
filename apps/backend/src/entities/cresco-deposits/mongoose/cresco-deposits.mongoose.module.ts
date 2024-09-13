import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  CrescoDepositsMongooseRecord,
  CrescoDepositsRecordSchema,
} from "./cresco-deposits.mongoose.record";
import { CrescoDepositsMongooseService } from "./cresco-deposits.mongoose.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CrescoDepositsMongooseRecord.name,
        schema: CrescoDepositsRecordSchema,
      },
    ]),
  ],
  providers: [CrescoDepositsMongooseService],
  exports: [CrescoDepositsMongooseService],
})
export class CrescoDepositsMongooseModule {}
