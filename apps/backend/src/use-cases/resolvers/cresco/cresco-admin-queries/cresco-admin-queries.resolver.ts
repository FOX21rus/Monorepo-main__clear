import { UserEntityService } from '../../../../entities/user/user.entity.service';
import { CrescoTransactionEntityService } from '../../../../entities/cresco-transaction/cresco-transaction.entity.service';
import { CrescoPortfolioStateEntityService } from '../../../../entities/cresco-portfolio-state/cresco-portfolio-state.entity.service';
import { CrescoCustomerEntityService } from '../../../../entities/cresco-customer/cresco-customer.entity.service';
import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import {OnlyAdmin, UserData} from 'src/_common/core-nest/guards/user.guard';
import {
  UserJWTPayload,
  CrescoCustomer,
  User,
  CrescoPortfolioState,
  CrescoTransactionStatus,
  CrescoTransaction,
} from 'src/schema';
import {EthCheckTransactionService} from "../../../../services/eth-check-transaction/eth-check-transaction.service";
@Resolver()
export class CrescoAdminQueries {
  constructor(
    private readonly userService: UserEntityService,
    private readonly crescoTransactionService: CrescoTransactionEntityService,
    private readonly crescoPortfolioStateService: CrescoPortfolioStateEntityService,
    private readonly crescoCustomerService: CrescoCustomerEntityService,
    private readonly ethCheckTransactionService:EthCheckTransactionService
  ) {}

  @OnlyAdmin()
  @Query()
  async crescoAdminGetCustomerList(
    @UserData() user: UserJWTPayload,
    @Args('userUri') userUri: string,
  ): Promise<CrescoCustomer[]> {
    const users = await this.userService.mongoose.find({
      $or: [{ roles: 'customer' }],
    });
    const emails = users.map((user) => `email://${user.email}`);
    return this.crescoCustomerService.mongoose.find({
      userUri: { $in: emails },
    });
  }

  @OnlyAdmin()
  @Query()
  async crescoAdminGetCustomerProfile(
    @UserData() user: UserJWTPayload,
    @Args('userUri') userUri: string,
  ): Promise<CrescoCustomer> {
    return this.crescoCustomerService.mongoose.findOne({ userUri });
  }

  @OnlyAdmin()
  @Query()
  async crescoAdminGetAdminList(
    @UserData() user: UserJWTPayload,
  ): Promise<User[]> {
    return this.userService.mongoose.find({
      $or: [
        { roles: 'admin' },
        { roles: 'super_admin' },
        { roles: 'dismissed' },
      ],
    });
  }


  @Query()
  async crescoAdminGetLastPortfolioState(
    @UserData() user: UserJWTPayload,
  ): Promise<CrescoPortfolioState> {
    const res = await this.crescoPortfolioStateService.mongoose
      .find({})
      .sort({ createdAt: -1 });
    if (!res[0]) await this.crescoPortfolioStateService.mongoose.create({
      createdAt:new Date(),
      currenciesAmountsHashmap:{},
      crescoTokensOverallAmount:0
    })
    return res[0];
  }

  @OnlyAdmin()
  @Query()
  async crescoAdminTransactionList(
    @UserData() user: UserJWTPayload,
    @Args('status') status: CrescoTransactionStatus,
  ): Promise<CrescoTransaction[]> {
    return this.crescoTransactionService.mongoose
      .find({})
      .sort({ createdAt: -1 });
  }

  @OnlyAdmin()
  @Query()
  async crescoAdminTransactionCheckInEth(
    @UserData() user: UserJWTPayload,
    @Args('transactionId') transactionId: string,
  ): Promise<string> {
    // const isSuccess = Math.random() > 0.5;
    const transaction = await this.crescoTransactionService.mongoose.findOne({
      _id: transactionId,
    });
    const found = await this.ethCheckTransactionService.matchUSDTTransaction(transaction.fromWallet,transaction.toWallet,transaction.amountUSDT)
    if (!found) return ''

    if (transaction.status === CrescoTransactionStatus.PENDING)
      await this.crescoTransactionService.mongoose.updateOne(
        { _id: transactionId },
        { $set: { status: CrescoTransactionStatus.ROBOT_APPROVED } },
      );
    return 'https://etherscan.io/tx/0xba4f241a8511ee29767cec1b8c404a238052a6a6ccd0528ad9fdb7893fd86848';
  }
}
