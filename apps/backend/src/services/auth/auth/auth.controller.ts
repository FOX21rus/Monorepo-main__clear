import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { HashService } from '../../precon/crypto/hash/hash.service';
import { AuthService } from '../auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('/api/admin/:secret/getPass')
  getPassForUserByAgrrementNo(
    @Query('agreementNo') agreementNo: string,
    @Param('secret') secret: string,
  ) {
    if (secret !== new HashService().config.secret)
      throw new HttpException('Не верный код доступа', 401);
    return new HashService().stringToHash(agreementNo);
    // Разместить этот пароль в авторизационном сервисе в рейсе логина PhoneAndOTP
    // А лучше добавить еще полем при парсинге таблицы в юзера, и отдавать это в профиле.
    // При наличии в профиле - переадресация на обычный кабинет
  }

  @Post('/api/user/reset_pass')
  async resetPassForUser(
    @Body('email') email: string,
    @Body('otp') otp: string,
    @Body('newPassword') newPassword: string,
  ) {
    await this.authService.recoverViaEmailAndCodeSetNewPassword(
      email,
      otp,
      newPassword,
    );
    return 'ok';
  }
}
