import { Test, TestingModule } from '@nestjs/testing';
import { EthCheckTransactionService } from './eth-check-transaction.service';

describe('EthCheckTransactionService', () => {
  let service: EthCheckTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EthCheckTransactionService],
    }).compile();

    service = module.get<EthCheckTransactionService>(
      EthCheckTransactionService,
    );
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
    await service
      .findAllIncommingWrappedTonTokenTransfers(
        '0xf13D7625bf1838c14Af331c5A5014Aea39CC9A8c',
      )
      .then((d) => console.log(d));
  });
});
