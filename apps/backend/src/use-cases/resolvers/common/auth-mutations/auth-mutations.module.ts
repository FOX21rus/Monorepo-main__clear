import { Module } from '@nestjs/common';
import { AuthMutations } from './auth-mutations.resolver';
import { AuthModule } from '../../../../services/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [AuthMutations],
})
export class AuthMutationsModule {}
