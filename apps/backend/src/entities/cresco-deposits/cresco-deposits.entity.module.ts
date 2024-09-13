import { Module } from "@nestjs/common";
import { CrescoDepositsEntityService } from "./cresco-deposits.entity.service";
import { CrescoDepositsMongooseModule } from "./mongoose/cresco-deposits.mongoose.module";

@Module({
  imports: [CrescoDepositsMongooseModule],
  providers: [CrescoDepositsEntityService],
  exports: [CrescoDepositsEntityService],
})
export class CrescoDepositsEntityModule {}
