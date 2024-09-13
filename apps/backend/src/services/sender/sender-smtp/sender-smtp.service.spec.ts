import { Test, TestingModule } from '@nestjs/testing';
import { SenderSmtpService } from './sender-smtp.service';

describe('SenderSmtpService', () => {
  let service: SenderSmtpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SenderSmtpService],
    }).compile();

    service = module.get<SenderSmtpService>(SenderSmtpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
