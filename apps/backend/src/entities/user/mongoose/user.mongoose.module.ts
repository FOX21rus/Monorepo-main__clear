import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserMongooseRecord, UserRecordSchema } from "./user.mongoose.record";
import { UserMongooseService } from "./user.mongoose.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserMongooseRecord.name, schema: UserRecordSchema },
    ]),
  ],
  providers: [UserMongooseService],
  exports: [UserMongooseService],
})
export class UserMongooseModule {}
