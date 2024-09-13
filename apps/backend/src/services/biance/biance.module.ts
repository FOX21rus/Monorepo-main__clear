import { Module } from '@nestjs/common';
import { BianceService } from './biance.service';
import { BianceController } from './biance.controller';
import {
  CrescoExternalCoinRateEntityModule
} from "../../entities/cresco-external-coin-rate/cresco-external-coin-rate.entity.module";

@Module({
  imports:[CrescoExternalCoinRateEntityModule],
  providers: [BianceService],
  controllers: [BianceController]
})
export class BianceModule {}
