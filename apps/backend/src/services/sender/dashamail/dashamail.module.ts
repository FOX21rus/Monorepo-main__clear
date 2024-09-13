import { Module } from '@nestjs/common';
import { DashamailService } from './dashamail.service';

@Module({
  providers: [DashamailService],
  exports: [DashamailService],
})
export class DashamailModule {}
