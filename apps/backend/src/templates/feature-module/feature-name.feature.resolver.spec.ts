import { Test, TestingModule } from '@nestjs/testing';
import { FeatureNameFeatureResolver } from './feature-name.resolver';

describe('FeatureNameResolver', () => {
  let resolver: FeatureNameFeatureResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeatureNameFeatureResolver],
    }).compile();

    resolver = module.get<FeatureNameFeatureResolver>(
      FeatureNameFeatureResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
