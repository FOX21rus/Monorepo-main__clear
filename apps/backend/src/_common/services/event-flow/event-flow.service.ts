import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable, Controller } from '@nestjs/common';
import { Queue } from 'bull';

export const EventFlowQueueName = 'EventFlow';

@Injectable()
export class EventFlowService {
  constructor(@InjectQueue(EventFlowQueueName) private readonly queue: Queue) {}
  async dispatch<T>(serviceName: string, data: T) {
    return this.queue.add(
      (data as any).name,
      { ...data, serviceName },
      { lifo: false },
    );
  }
}
