import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import { CrescoDepositsEntityService } from '../../../entities/cresco-deposits/cresco-deposits.entity.service';
import { HashService } from '../../../services/precon/crypto/hash/hash.service';
@Injectable()
export class CrescoBaseService {
  constructor(
    private readonly crescoDepositsEntityService: CrescoDepositsEntityService,
  ) {}

  async crescoGetDepositInfoByHashToken(hashToken: string) {
    //ToDo рефарторнг имени переменной и функции - теперь это токен
    //current это имя записи а не пользователя
    const dep = await this.crescoDepositsEntityService.mongoose.findOne({
      name: 'current',
    });

    const parsed = dep.payload;
    if (parsed) {
      // const parsed = JSON.parse(
      //   fs.readFileSync('public/deposits.json').toString(),
      // );

      const agreementNo = new HashService().challengeArray(
        hashToken,
        Object.keys(parsed),
      );
      if (!agreementNo) return false;
      return parsed[agreementNo];
    } else return false;
  }

  async checkUser(token: string, lastName: string) {
    const info = await this.crescoGetDepositInfoByHashToken(token);
    return !!info;
  }
}
