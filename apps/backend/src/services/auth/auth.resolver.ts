import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthTelegramWebappModule } from '../auth-telegram-webapp/auth-telegram-webapp.module';
import { UserData } from '../../_common/core-nest/guards/user.guard';
import { UserJWTPayload } from '../../schema';

@Resolver()
export class AuthResolver {
  @Query()
  getMe(@UserData() user: UserJWTPayload) {
    console.log('UserJWTPayload', user);
    return user;
  }
}
