import { Test, TestingModule } from '@nestjs/testing';
import { AuthTelegramWebappService } from './auth-telegram-webapp.service';

const testInitData =
  'query_id=AAEvBg0AAAAAAC8GDQCti9A0&user=%7B%22id%22%3A853551%2C%22first_name%22%3A%22Nick%22%2C%22last_name%22%3A%22Erlan%22%2C%22username%22%3A%22nickolaierlan%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%7D&auth_date=1660076083&hash=7e75b96b1b650e545333d7053bc3b2826cb250ec5cf37d7a4c03e66538ddfa88';
describe('AuthTelegramWebappService', () => {
  let service: AuthTelegramWebappService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthTelegramWebappService],
    }).compile();

    service = module.get<AuthTelegramWebappService>(AuthTelegramWebappService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('parse querystring', () => {
    const parsed = service.parseInitData(testInitData);
    expect(parsed.user.id).toEqual(853551);
  });
  it('validates', () => {
    const valid = service.validateInitData(
      testInitData,
      '5565728028:AAH8MCCaiNOyZFnrGoBy8nXmhE1s6O52Q38',
    );
    expect(valid).toEqual(true);
  });
  it('fails validation with wrong bot key', () => {
    const valid = service.validateInitData(
      testInitData,
      '5565728028:AAH8MCCaiNOyZFnrGoBy8nXmhE1s6O52Q37',
    );
    expect(valid).toEqual(false);
  });
  it('fails validation with for another data', () => {
    const hasUser = testInitData.match(/853551/g);
    expect(hasUser).toBeTruthy();
    const valid = service.validateInitData(
      testInitData.replace('853551', '853552'),
      '5565728028:AAH8MCCaiNOyZFnrGoBy8nXmhE1s6O52Q38',
    );
    expect(valid).toEqual(false);
  });
});
