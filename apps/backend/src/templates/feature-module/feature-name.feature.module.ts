import { Module } from '@nestjs/common';
import { FeatureNameFeatureService } from './feature-name.feature.service';
import { FeatureNameFeatureResolver } from './feature-name.feature.resolver';

@Module({
  providers: [FeatureNameFeatureService, FeatureNameFeatureResolver],
})
export class FeatureNameFeatureModule {}
