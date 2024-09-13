import { Module } from '@nestjs/common';
import { SenderSmsBytehandService } from './sender-sms-bytehand.service';

@Module({
  providers: [SenderSmsBytehandService],
  exports: [SenderSmsBytehandService],
})
export class SenderSmsBytehandModule {}
