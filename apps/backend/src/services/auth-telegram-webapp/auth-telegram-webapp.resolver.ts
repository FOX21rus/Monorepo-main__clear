import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { AuthTelegramWebappService } from './auth-telegram-webapp.service';
import { HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserJWTPayload } from '../../schema';

@Resolver()
export class AuthTelegramWebappResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly authTelegramWebappService: AuthTelegramWebappService,
    private readonly configService: ConfigService,
  ) {}
  @Mutation()
  async createOrFindUserViaTelegramInitData(
    @Args('telegramInitData') telegramInitData: string,
  ) {
    console.log('createOrFindUserViaTelegramInitData', telegramInitData);
    const botTokens = this.configService.get('telegram.allowedToAuthTokens');
    if (
      !botTokens.find((token) =>
        this.authTelegramWebappService.validateInitData(
          telegramInitData,
          token,
        ),
      )
    )
      throw new HttpException('invalid data', HttpStatus.UNAUTHORIZED);

    const data = this.authTelegramWebappService.parseInitData(telegramInitData);
    console.log(data);
    let user = await this.authService.findUserByUri(
      `telegram://${data.user.id}`,
    );
    console.log('findUserByUri', user, `telegram://${data.user.id}`);
    if (!user) {
      console.log('user not found');
      await this.authService.createUser({
        telegramId: String(data.user.id),
        displayName: [data.user.first_name, data.user.last_name]
          .filter(Boolean)
          .join(' '),
        rolesJwt: ['user'],
      });
    }

    user = await this.authService.findUserByUri(`telegram://${data.user.id}`);

    if (!user) throw new HttpException('User not created', 500);

    const payload = new UserJWTPayload();
    payload.userUri = `telegram://${user.telegramId}`;
    payload.displayName = user.displayName;
    payload.rolesJWT = user.rolesJwt;
    return this.authService.signJWT(payload);
  }
}
