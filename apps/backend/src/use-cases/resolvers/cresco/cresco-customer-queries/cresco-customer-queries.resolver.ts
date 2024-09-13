import { UserEntityService } from '../../../../entities/user/user.entity.service';
import { CrescoNotificationEntityService } from '../../../../entities/cresco-notification/cresco-notification.entity.service';
import { CrescoPortfolioStateEntityService } from '../../../../entities/cresco-portfolio-state/cresco-portfolio-state.entity.service';
import { CrescoCustomerEntityService } from '../../../../entities/cresco-customer/cresco-customer.entity.service';
import { CrescoTransactionEntityService } from '../../../../entities/cresco-transaction/cresco-transaction.entity.service';
import { CrescoExternalCoinRateEntityService } from '../../../../entities/cresco-external-coin-rate/cresco-external-coin-rate.entity.service';
import { CrescoBaseService } from '../../../cresco/cresco-base/cresco-base.service';
import { CrescoTokenRateEntityService } from '../../../../entities/cresco-token-rate/cresco-token-rate.entity.service';
import { CrescoPublicationEntityService } from '../../../../entities/cresco-publication/cresco-publication.entity.service';
import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { OnlyAuth, UserData } from 'src/_common/core-nest/guards/user.guard';
import {
  UserJWTPayload,
  CrescoCustomer,
  CrescoTransaction,
  CrescoNotification,
  CrescoExternalCoinRate,
  CrescoExternalCoinRateHistory,
  CrescoTokenRate,
  CrescoPublication,
  CrescoTokenRatesPeriod,
} from 'src/schema';
import { CrescoTokenRateCalculatorService } from '../../../../services/cresco-token-rate-calculator/cresco-token-rate-calculator.service';
import * as moment from 'moment';
@Resolver()
export class CrescoCustomerQueries {
  constructor(
    private readonly userService: UserEntityService,
    private readonly crescoNotificationService: CrescoNotificationEntityService,
    private readonly crescoPortfolioStateService: CrescoPortfolioStateEntityService,
    private readonly crescoCustomerService: CrescoCustomerEntityService,
    private readonly crescoTransactionService: CrescoTransactionEntityService,
    private readonly crescoExternalCoinRateService: CrescoExternalCoinRateEntityService,
    private readonly crescoBaseService: CrescoBaseService,
    private readonly crescoTokenRateService: CrescoTokenRateEntityService,
    private readonly crescoPublicationService: CrescoPublicationEntityService,
    private readonly crescoTokenRateCalculatorService: CrescoTokenRateCalculatorService,
  ) {}
  @Query()
  async userCreate(
    @UserData() user: UserJWTPayload,
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<string> {
    await this.userService.mongoose.create({ email, passwordHash: password });
    return 'ok';
  }
  @Query()
  async crescoCustomerGetMyProfile(
    @UserData() user: UserJWTPayload,
  ): Promise<CrescoCustomer> {
    console.log('crescoCustomerGetMyProfile', user);
    const extUser = await this.crescoCustomerService.mongoose.findOne({
      userUri: `email://${user.email}`,
    });
    if (!extUser) {
      const customer = new CrescoCustomer();
      customer.userUri = `email://${user.email}`;
      customer.phone = extUser.phone
      customer.crescoTokenBalance = 0;
      customer.isPassportVerified = false;
      await this.crescoCustomerService.mongoose.create(customer);
    }
    const customer = await this.crescoCustomerService.mongoose.findOne({
      userUri: `email://${user.email}`,
    });
    return customer;
  }
  @Query()
  async crescoCustomerGetCalculatedBalance(
    @UserData() user: UserJWTPayload,
  ): Promise<number> {
    const customer = await this.crescoCustomerService.mongoose.findOne({
      userUri: `email://${user.email}`,
    });
    const balance = customer.crescoTokenBalance;
    const rates = await this.crescoExternalCoinRateService.mongoose.find({});
    const portfolios = await this.crescoPortfolioStateService.mongoose
      .find({})
      .sort({ createdAt: -1 })
      .limit(1);
    const portfolio = portfolios[0] as any;
    if (!rates) throw 'rates not found';
    if (!portfolio) throw 'portfolio not found';
    const total = Object.entries(portfolio.currenciesAmountsHashmap).reduce(
      (p, [sym, amount]) => {
        const found = rates.find(
          (r) => (r.name.toLowerCase() === sym.toLowerCase())&&(!!amount),
        );
        // console.log('syms', sym, amount);
        if (!found) return p;
        // console.log('found', sym, amount);
        return p + found.rate * parseFloat(amount as string);
      },
      0,
    );

    const share = balance / (portfolio.crescoTokensOverallAmount ?? 1);
    console.log('share', balance, share, total);
    return total * share;
  }

  @Query()
  async crescoCustomerGetProfitability(
    @UserData() user: UserJWTPayload,
  ): Promise<number> {
    const customer = await this.crescoCustomerService.mongoose.findOne({
      userUri: `email://${user.email}`,
    });
    const balance = customer.crescoTokenBalance;
    const rates = await this.crescoExternalCoinRateService.mongoose.find({});
    const portfolios = await this.crescoPortfolioStateService.mongoose
      .find({})
      .sort({ createdAt: -1 })
      .limit(1);
    const portfolio = portfolios[0] as any;
    if (!rates) throw 'rates not found';
    if (!portfolio) throw 'portfolio not found';
    const total = Object.entries(portfolio.currenciesAmountsHashmap).reduce(
      (p, [sym, amount]) => {
        const found = rates.find(
          (r) => (r.name.toLowerCase() === sym.toLowerCase())&&!!amount,
        );
        if (!found) return p;
        return p + found.rate * parseFloat(amount as string);
      },
      0,
    );
    const share = balance / portfolio.crescoTokensOverallAmount;
    const Nk = total * share;
    return this.crescoTokenRateCalculatorService.calculateProfitability(
      `email://${user.email}`,
      Nk,
    );
  }

  @Query()
  async crescoCustomerTransactionList(
    @UserData() user: UserJWTPayload,
  ): Promise<CrescoTransaction[]> {
    return this.crescoTransactionService.mongoose.find({
      userUri: `email://${user.email}`,
    });
  }

  @Query()
  async crescoCustomerMyNotificationsList(
    @UserData() user: UserJWTPayload,
  ): Promise<CrescoNotification[]> {
    await this.crescoNotificationService.mongoose.updateMany(
      { userUri: user.userUri },
      { $set: { isRead: true } },
    );
    return this.crescoNotificationService.mongoose
      .find({ userUri: user.userUri })
      .sort({ createdAt: -1 })
      .limit(50);
  }

  @Query()
  async crescoCustomerHasUnreadNotifications(
    @UserData() user: UserJWTPayload,
  ): Promise<Boolean> {
    if (!user?.userUri) return false;
    return !!(await this.crescoNotificationService.mongoose.countDocuments({
      userUri: user.userUri,
      isRead: { $ne: true },
    }));
  }

  @Query()
  async crescoGetExternalCoinsRates(
    @UserData() user: UserJWTPayload,
  ): Promise<CrescoExternalCoinRate[]> {
    return this.crescoExternalCoinRateService.mongoose.find({});
  }
  @Query()
  async crescoGetExternalCoinsRatesHistory(
    @UserData() user: UserJWTPayload,
    @Args('limit') limit: number,
  ): Promise<CrescoExternalCoinRateHistory[]> {
    return null as any;
  }
  @Query()
  async crescoCheckUserClassicByAgreementNoAndLastName(
    @UserData() user: UserJWTPayload,
    @Args('agreementNo') token: string, //changed to token
    @Args('lastName') lastName: string, //doesnt matter for social security reasons
  ): Promise<boolean> {
    return this.crescoBaseService.checkUser(token, lastName);
  }
  // Следующий шаг:
  // -
  @Query()
  async crescoGetCurrentCrescoTokenRate(
    @UserData() user: UserJWTPayload,
  ): Promise<CrescoTokenRate> {
    const rate = await this.crescoTokenRateService.mongoose
      .find({})
      .sort({ ts: -1 })
      .limit(1);
    if (rate[0]) return rate[0];
    return {
      ts: new Date(),
      rateUSDT: 1,
      crescoTokensAmount: 0,
    };
  }
  @Query()
  async crescoGetCrescoTokenRateHistory(
    @UserData() user: UserJWTPayload,
    @Args('forPeriod') forPeriod: CrescoTokenRatesPeriod,
  ): Promise<CrescoTokenRate[]> {
    const numPoints = 48;
    let startDate = moment().startOf('week').subtract(1, 'weeks');
    let bucketSize: number = (7 * 24 * 60 * 60 * 1000) / numPoints;

    if (forPeriod === CrescoTokenRatesPeriod.DAY) {
      startDate = moment().startOf('day').subtract(1, 'days');
      bucketSize = (24 * 60 * 60 * 1000) / numPoints;
    } else if (forPeriod === CrescoTokenRatesPeriod.WEEK) {
      startDate = moment().startOf('week').subtract(1, 'weeks');
      bucketSize = (7 * 24 * 60 * 60 * 1000) / numPoints;
    } else if (forPeriod === CrescoTokenRatesPeriod.MONTH) {
      startDate = moment().startOf('month').subtract(1, 'months');
      bucketSize = (30 * 24 * 60 * 60 * 1000) / numPoints;
    } else if (forPeriod === CrescoTokenRatesPeriod.MONTH3) {
      startDate = moment().startOf('months').subtract(3, 'months');
      bucketSize = (90 * 24 * 60 * 60 * 1000) / numPoints;
    } else if (forPeriod === CrescoTokenRatesPeriod.YEAR) {
      startDate = moment().startOf('year').subtract(1, 'year');
      bucketSize = (365 * 24 * 60 * 60 * 1000) / numPoints;
    } else if (forPeriod === CrescoTokenRatesPeriod.ALL) {
      startDate = moment().startOf('year').subtract(10, 'year');
      bucketSize = (10 * 365 * 24 * 60 * 60 * 1000) / numPoints;
    }

    const offset = bucketSize / 2;

    const result = await this.crescoTokenRateService.mongoose
      .aggregate([
        {
          $match: {
            ts: { $gte: startDate.toDate() },
          },
        },
        {
          $bucketAuto: {
            groupBy: '$ts',
            buckets: numPoints,
            output: {
              ts: { $last: '$ts' },
              rateUSDT: { $first: '$rateUSDT' },
              crescoTokensAmount: { $first: '$crescoTokensAmount' },
            },
          },
        },
        { $sort: { ts: -1 } },
      ])
      .exec();

    return result;

    // return rates;
  }
  @Query()
  async crescoCustomerListPublications(
    @UserData() user: UserJWTPayload,
  ): Promise<CrescoPublication[]> {
    return this.crescoPublicationService.mongoose
      .find({})
      .sort({ createdAt: -1 });
  }
}
