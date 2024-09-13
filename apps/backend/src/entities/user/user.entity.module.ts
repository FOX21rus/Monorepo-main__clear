import { Module } from '@nestjs/common';
import { UserEntityService } from './user.entity.service';
import { UserMongooseModule } from './mongoose/user.mongoose.module';

@Module({
  imports: [UserMongooseModule],
  providers: [UserEntityService],
  exports: [UserEntityService],
})
export class UserEntityModule {}
