import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  CrescoPortfolioStateMongooseRecord,
  CrescoPortfolioStateRecordSchema,
} from "./cresco-portfolio-state.mongoose.record";
import { CrescoPortfolioStateMongooseService } from "./cresco-portfolio-state.mongoose.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CrescoPortfolioStateMongooseRecord.name,
        schema: CrescoPortfolioStateRecordSchema,
      },
    ]),
  ],
  providers: [CrescoPortfolioStateMongooseService],
  exports: [CrescoPortfolioStateMongooseService],
})
export class CrescoPortfolioStateMongooseModule {}
