import { Module } from '@nestjs/common';
import { CrescoPortfolioStateEntityService } from './cresco-portfolio-state.entity.service';
import { CrescoPortfolioStateMongooseModule } from './mongoose/cresco-portfolio-state.mongoose.module';

@Module({
  imports: [CrescoPortfolioStateMongooseModule],
  providers: [CrescoPortfolioStateEntityService],
  exports: [CrescoPortfolioStateEntityService],
})
export class CrescoPortfolioStateEntityModule {}
