import { Test, TestingModule } from '@nestjs/testing';
import { FeatureNameFeatureService } from './feature-name.service';

describe('FeatureNameService', () => {
  let service: FeatureNameFeatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeatureNameFeatureService],
    }).compile();

    service = module.get<FeatureNameFeatureService>(FeatureNameFeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
