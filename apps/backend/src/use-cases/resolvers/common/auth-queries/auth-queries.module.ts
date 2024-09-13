import { Module } from '@nestjs/common';
import { AuthQueries } from './auth-queries.resolver';
import { AuthModule } from '../../../../services/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [AuthQueries],
})
export class AuthQueriesModule {}
