import { BullModule } from "@nestjs/bull";
import { Module } from '@nestjs/common';

import { EventFlowService } from './event-flow.service';
// import { ParserPdfBiochargeQueueName } from "../../services/parser-pdf-biocharge/parser-pdf-biocharge.module";

import { EventFlowProcessor } from './event-flow.processor';

export const EventFlowQueueName = 'EventFlow';

@Module({
  imports: [
    BullModule.registerQueue({
      name: EventFlowQueueName,
    }),
  ],
  // exports:[BullModule],
  providers: [EventFlowService],
  exports:[EventFlowService]
})
export class EventFlowModule { }
