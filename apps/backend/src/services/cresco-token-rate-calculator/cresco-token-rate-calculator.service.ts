import { Injectable } from '@nestjs/common';
import { CrescoTokenRateEntityService } from '../../entities/cresco-token-rate/cresco-token-rate.entity.service';
import { CrescoCustomer, CrescoPortfolioState } from '../../schema';
import { CrescoExternalCoinRateEntityService } from '../../entities/cresco-external-coin-rate/cresco-external-coin-rate.entity.service';
import { CrescoPortfolioStateEntityModule } from '../../entities/cresco-portfolio-state/cresco-portfolio-state.entity.module';
import { CrescoPortfolioStateEntityService } from '../../entities/cresco-portfolio-state/cresco-portfolio-state.entity.service';
import { CrescoCustomerEntityService } from '../../entities/cresco-customer/cresco-customer.entity.service';
import { GenerateReportCryptoInput } from '../cresco-generate-report-crypto/cresco-generate-report-crypto.service';
import { CrescoTransactionEntityService } from '../../entities/cresco-transaction/cresco-transaction.entity.service';

@Injectable()
export class CrescoTokenRateCalculatorService {
  constructor(
    private readonly crescoTokenRateService: CrescoTokenRateEntityService,
    private readonly crescoExternalCoinRateService: CrescoExternalCoinRateEntityService,
    private readonly crescoPortfolioStateService: CrescoPortfolioStateEntityService,
    private readonly crescoCustomerService: CrescoCustomerEntityService,
    private readonly crescoTransactionEntityService: CrescoTransactionEntityService,
  ) {}
  // async calculateProfitability(
  //   userUri: string,
  //   currentUsdt: number,
  // ): Promise<number> {
  //   const transactions = await this.crescoTransactionEntityService.mongoose
  //     .find({ userUri, status: 'APPROVED' })
  //     .sort({ createdAt: 1 })
  //     .exec();
  //
  //   const initialDeposit =
  //     transactions.find(
  //       (transaction) => transaction.transactionType === 'CLIENT_BUY_TOKENS',
  //     )?.amountUSDT || 0;
  //   const deposits = transactions.filter(
  //     (transaction) =>
  //       transaction.transactionType === 'CLIENT_BUY_TOKENS' &&
  //       transaction.amountUSDT !== initialDeposit,
  //   );
  //   const withdrawals = transactions.filter(
  //     (transaction) => transaction.transactionType === 'CLIENT_SELL_TOKENS',
  //   );
  //
  //   const T = Math.ceil(
  //     (new Date().getTime() - new Date(transactions[0].createdAt).getTime()) /
  //       (1000 * 60 * 60 * 24),
  //   );
  //   const sumDeposits = deposits.reduce(
  //     (sum, deposit) => sum + deposit.amountUSDT,
  //     0,
  //   );
  //   const sumWithdrawals = withdrawals.reduce(
  //     (sum, withdrawal) => sum + withdrawal.amountUSDT,
  //     0,
  //   );
  //   const sumDaysDeposits = deposits.reduce(
  //     (sum, deposit) =>
  //       sum +
  //       Math.ceil(
  //         (new Date().getTime() - new Date(deposit.createdAt).getTime()) /
  //           (1000 * 60 * 60 * 24),
  //       ),
  //     0,
  //   );
  //   const sumDaysWithdrawals = withdrawals.reduce(
  //     (sum, withdrawal) =>
  //       sum +
  //       Math.ceil(
  //         (new Date().getTime() - new Date(withdrawal.createdAt).getTime()) /
  //           (1000 * 60 * 60 * 24),
  //       ),
  //     0,
  //   );
  //
  //   const profitability =
  //     ((currentUsdt - initialDeposit - sumDeposits + sumWithdrawals) *
  //       T *
  //       100) /
  //     (initialDeposit * T +
  //       sumDeposits * (sumDaysDeposits / T) -
  //       sumWithdrawals * (sumDaysWithdrawals / T));
  //
  //
  //   return profitability;
  // }
  async calculateProfitability(
    userUri: string,
    currentUsdt: number,
  ): Promise<number> {
    const transactions = await this.crescoTransactionEntityService.mongoose
      .find({ userUri, status: 'APPROVED' })
      .sort({ createdAt: 1 })
      .exec();

    const initialDeposit =
      transactions.find(
        (transaction) => transaction.transactionType === 'CLIENT_BUY_TOKENS',
      )?.amountUSDT || 0;
    const deposits = transactions.filter(
      (transaction) => transaction.transactionType === 'CLIENT_BUY_TOKENS',
    );
    const withdrawals = transactions.filter(
      (transaction) => transaction.transactionType === 'CLIENT_SELL_TOKENS',
    );

    const lastDeposit = deposits[deposits.length - 1]?.amountUSDT || 0;
    const firstDeposit = deposits[0]?.amountUSDT || 0;
    const sumDeposits = deposits.reduce(
      (sum, deposit) => sum + deposit.amountUSDT,
      0,
    );
    const sumWithdrawals = withdrawals.reduce(
      (sum, withdrawal) => sum + withdrawal.amountUSDT,
      0,
    );

    const T = Math.ceil(
      (new Date().getTime() - new Date(transactions[0].createdAt).getTime()) /
        (1000 * 60 * 60 * 24),
    );

    const sumDaysDepositsExceptFirstVerbose = [] as string[];
    const sumDaysDepositsExceptFirst = deposits
      .filter((d, i) => i > 0)
      .reduce((sum, deposit, i) => {
        // sumDaysDepositsExceptFirstVerbose.push(
        //   `Внесение на депозит №${i + 2}. Сумма ${
        //     deposit.amountUSDT
        //   } Дана внесения ${deposit.createdAt}. Прошло ${
        //     (new Date().getTime() - new Date(deposit.createdAt).getTime()) /
        //     (1000 * 60 * 60 * 24)
        //   } суток, которые окгуляются вверх. Умножаем сумму на количество дней и получаем ${
        //     Math.ceil(
        //       (new Date().getTime() - new Date(deposit.createdAt).getTime()) /
        //         (1000 * 60 * 60 * 24),
        //     ) * deposit.amountUSDT
        //   }, которые добавляем к общему итогу.`,
        // );
        return (
          sum +
          Math.ceil(
            (new Date().getTime() - new Date(deposit.createdAt).getTime()) /
              (1000 * 60 * 60 * 24),
          ) *
            deposit.amountUSDT
        );
      }, 0);
    console.log(`Пропускаем подсчет по 1 депозиту`);
    console.log(sumDaysDepositsExceptFirstVerbose.join('\n'));
    console.log(`Получили сумму ${sumDaysDepositsExceptFirst}`);

    const sumDaysWithdrawals = withdrawals.reduce((sum, withdrawal) => {
      return (
        sum +
        Math.ceil(
          (new Date().getTime() - new Date(withdrawal.createdAt).getTime()) /
            (1000 * 60 * 60 * 24),
        ) *
          withdrawal.amountUSDT
      );
    }, 0);
    const allDepositsExceptFirst = sumDeposits - initialDeposit;

    const profitability =
      ((currentUsdt -
        initialDeposit -
        allDepositsExceptFirst +
        sumWithdrawals) *
        T *
        100) /
      (initialDeposit * T + sumDaysDepositsExceptFirst - sumDaysWithdrawals);
    console.log(
      `profitability =
      ((currentUsdt -
        initialDeposit -
        allDepositsExceptFirst +
        sumWithdrawals) *
        T *
        100) /
      (initialDeposit * T + sumDaysDepositsExceptFirst - sumDaysWithdrawals);`,
      {
        profitability,
        currentUsdt,
        initialDeposit,
        sumWithdrawals,
        allDepositsExceptFirst,
        lastDeposit,
        T,
        sumDaysDepositsExceptFirst,
        sumDaysWithdrawals,
      },
    );

    return profitability;
  }

  async updateCrescoTokenRateOnNewPortfolioState(
    portfolioState: CrescoPortfolioState,
  ) {
    await this.crescoTokenRateService.mongoose.create({
      rateUSDT: await this.calculateCrescoTokenRate(portfolioState),
      ts: new Date(),
      crescoTokensAmount: portfolioState.crescoTokensOverallAmount,
    });
    return 'ok';
  }

  async updateCrescoTokenRateAfterExternalRateChanges() {
    const pss = await this.crescoPortfolioStateService.mongoose
      .find({})
      .sort({ createdAt: -1 })
      .limit(1);
    const portfolioState = pss?.[0];
    await this.crescoTokenRateService.mongoose.create({
      rateUSDT: await this.calculateCrescoTokenRate(portfolioState),
      ts: new Date(),
      crescoTokensAmount: portfolioState.crescoTokensOverallAmount,
    });
    return 'ok';
  }

  async calculateCrescoTokenRate(portfolioState: CrescoPortfolioState) {
    console.log('portfolioState', portfolioState);
    const total = await this.getPortfolioTotalUSDTValue(portfolioState);
    console.log('total', total);
    return total / (portfolioState.crescoTokensOverallAmount ?? 1000);
  }
  async calculateStatsForUserUri(userUri) {
    const customer = await this.crescoCustomerService.mongoose.findOne({
      userUri,
    });

    const { overallUSDTInvestments, crescoTokenBalance, agreementNo } =
      customer;
    const state = await this.getLastCrescoPortfolioState();
    console.log(state);

    const share = crescoTokenBalance / state.crescoTokensOverallAmount;
    const fio = [customer.lastName, customer.firstName, customer.middleName]
      .filter(Boolean)
      .join(' ');

    const total = await this.getPortfolioTotalUSDTValue(state);
    const values = await this.getPortfolioCoinsUSDTValues(state);

    const input = {
      fio,
      agreementNo,
      deltaPercent: (total * share) / overallUSDTInvestments - 1,
      comment: '',
      code: '',
      total: total * share,
      assets: Object.entries(state.currenciesAmountsHashmap).map(
        ([name, value]) => {
          return {
            value: values[name] * share,
            coinName: name.toUpperCase(),
            coinNameUSDT: name.toUpperCase() + 'USDT',
            coinShare: ((100 * values[name]) / total).toFixed(2) + '%',
          };
        },
      ),
    } as GenerateReportCryptoInput;
    return input;
  }
  async getLastCrescoTokenRate() {
    const rates = await this.crescoTokenRateService.mongoose
      .find({})
      .limit(1)
      .sort({ ts: -1 });

    const rate = rates?.[0];
    if (!rate) throw 'rate not defined';
    return rate?.rateUSDT;
  }

  async getLastCrescoPortfolioState(): Promise<CrescoPortfolioState> {
    const states = await this.crescoPortfolioStateService.mongoose
      .find({})
      .limit(1)
      .sort({ createdAt: -1 });

    const state = states?.[0];
    if (!state) throw 'state not defined';
    return state;
  }
  async getFirstCrescoPortfolioState(): Promise<CrescoPortfolioState> {
    const states = await this.crescoTokenRateService.mongoose
      .find({})
      .limit(1)
      .sort({ ts: 1 });

    const state = states?.[0];
    if (!state) throw 'state not defined';
    return state;
  }
  async getPortfolioValue(fromDate: Date, toDate: Date) {
    return this.crescoTokenRateService.mongoose
      .aggregate([
        {
          $match: {
            ts: { $gte: fromDate, $lte: toDate },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$ts' } },
            ts: { $first: '$ts' },
            rateUSDT: { $first: '$rateUSDT' },
            crescoTokensAmount: { $first: '$crescoTokensAmount' },
          },
        },
        {
          $addFields: {
            value: { $multiply: ['$crescoTokensAmount', '$rateUSDT'] },
          },
        },
      ])
      .sort({ ts: -1 });
  }
  async getPortfolioTotalUSDTValue(portfolio: CrescoPortfolioState) {
    const rates = await this.crescoExternalCoinRateService.mongoose.find({});
    const total = Object.entries(portfolio.currenciesAmountsHashmap).reduce(
      (p, [sym, amount]) => {
        const found = rates.find(
          (r) => (r.name.toLowerCase() === sym.toLowerCase())&&!!amount,
        );
        if (!found || !found.rate || !amount) return p;
        return p + found.rate * parseFloat(amount as string);
      },
      0,
    );
    return total;
  }
  async getPortfolioCoinsUSDTValues(
    portfolio: CrescoPortfolioState,
  ): Promise<Record<string, number>> {
    const rates = await this.crescoExternalCoinRateService.mongoose.find({});
    const total = Object.fromEntries(
      Object.entries(portfolio.currenciesAmountsHashmap).map(
        ([sym, amount]) => {
          const found = rates.find(
            (r) => (r.name.toLowerCase() === sym.toLowerCase())&&!!amount,
          );
          if (!found) return [sym, 0];
          return [sym, found.rate * parseFloat(amount as string)];
        },
      ),
    );
    return total;
  }
}
