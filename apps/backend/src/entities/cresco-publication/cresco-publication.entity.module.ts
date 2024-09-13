import { Module } from '@nestjs/common';
import { CrescoPublicationEntityService } from './cresco-publication.entity.service';
import { CrescoPublicationMongooseModule } from './mongoose/cresco-publication.mongoose.module';

@Module({
  imports: [CrescoPublicationMongooseModule],
  providers: [CrescoPublicationEntityService],
  exports: [CrescoPublicationEntityService],
})
export class CrescoPublicationEntityModule {}
