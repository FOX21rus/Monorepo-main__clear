import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  CrescoTransactionMongooseRecord,
  CrescoTransactionRecordSchema,
} from "./cresco-transaction.mongoose.record";
import { CrescoTransactionMongooseService } from "./cresco-transaction.mongoose.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CrescoTransactionMongooseRecord.name,
        schema: CrescoTransactionRecordSchema,
      },
    ]),
  ],
  providers: [CrescoTransactionMongooseService],
  exports: [CrescoTransactionMongooseService],
})
export class CrescoTransactionMongooseModule {}
