import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  CrescoCustomerMongooseRecord,
  CrescoCustomerRecordSchema,
} from "./cresco-customer.mongoose.record";
import { CrescoCustomerMongooseService } from "./cresco-customer.mongoose.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CrescoCustomerMongooseRecord.name,
        schema: CrescoCustomerRecordSchema,
      },
    ]),
  ],
  providers: [CrescoCustomerMongooseService],
  exports: [CrescoCustomerMongooseService],
})
export class CrescoCustomerMongooseModule {}
