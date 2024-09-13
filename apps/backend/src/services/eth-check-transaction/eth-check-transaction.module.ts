import { Module } from '@nestjs/common';
import { EthCheckTransactionService } from './eth-check-transaction.service';

@Module({
  providers: [EthCheckTransactionService],
  exports: [EthCheckTransactionService],
})
export class EthCheckTransactionModule {}
