import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

export const EventFlowQueueName = 'EventFlow';

@Processor(EventFlowQueueName)
export class EventFlowProcessor {
  private readonly logger = new Logger(EventFlowProcessor.name);

  @Process('test')
  handleTranscode(job: Job) {
    this.logger.debug('Start transcoding...');
    this.logger.debug(job.data);
    this.logger.debug('Transcoding completed');
  }
}
