import { Test, TestingModule } from '@nestjs/testing';
import { CrescoNotificationsSenderService } from './cresco-notifications-sender.service';

describe('CrescoNotificationsSenderService', () => {
  let service: CrescoNotificationsSenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrescoNotificationsSenderService],
    }).compile();

    service = module.get<CrescoNotificationsSenderService>(CrescoNotificationsSenderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
