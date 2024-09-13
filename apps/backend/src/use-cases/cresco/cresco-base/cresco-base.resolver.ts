import { Args, Query, Resolver } from '@nestjs/graphql';
import { CrescoBaseService } from './cresco-base.service';
import {UserData} from "../../../_common/core-nest/guards/user.guard";
import {UserJWTPayload} from "../../../schema";

@Resolver()
export class CrescoBaseResolver {
  constructor(private readonly crescoBaseService: CrescoBaseService) {}
  @Query((returns) => JSON)
  crescoGetDepositInfoByAgreementNumber(
    @Args('agreementNo') agreementNo: string,
  ) {
    return this.crescoBaseService.crescoGetDepositInfoByHashToken(
      agreementNo,
    );
  }

  @Query((returns) => JSON)
  crescoGetMyDepositInfo(
      @UserData() user: UserJWTPayload,
  ) {
    return this.crescoBaseService.crescoGetDepositInfoByHashToken(user.email
    );
  }
}
