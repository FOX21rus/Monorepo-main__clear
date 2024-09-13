import { UserEntityService } from '../../../../entities/user/user.entity.service';
import { CrescoNotificationEntityService } from '../../../../entities/cresco-notification/cresco-notification.entity.service';
import { CrescoPortfolioStateEntityService } from '../../../../entities/cresco-portfolio-state/cresco-portfolio-state.entity.service';
import { CrescoCustomerEntityService } from '../../../../entities/cresco-customer/cresco-customer.entity.service';
import { CrescoTransactionEntityService } from '../../../../entities/cresco-transaction/cresco-transaction.entity.service';
import { fillDefinedAndNotNull } from '../../../../_common/utils/utils';
import { CrescoExternalCoinRateEntityService } from '../../../../entities/cresco-external-coin-rate/cresco-external-coin-rate.entity.service';
import { CrescoBaseService } from '../../../cresco/cresco-base/cresco-base.service';
import { SenderSmtpService } from '../../../../services/sender/sender-smtp/sender-smtp.service';
import { ConfigService } from '@nestjs/config';
import { CrescoExternalCoinRateHistoryEntityService } from '../../../../entities/cresco-external-coin-rate-history/cresco-external-coin-rate-history.entity.service';
import { CrescoTokenRateEntityService } from '../../../../entities/cresco-token-rate/cresco-token-rate.entity.service';
import { CrescoTokenRateCalculatorService } from '../../../../services/cresco-token-rate-calculator/cresco-token-rate-calculator.service';
import { CrescoNotificationsSenderService } from '../../../../services/cresco-notifications-sender/cresco-notifications-sender.service';
import { CrescoPublicationEntityService } from '../../../../entities/cresco-publication/cresco-publication.entity.service';
import { randomUUID } from 'crypto';
import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import {
  OnlyAdmin,
  OnlySuperAdmin,
  UserData,
} from 'src/_common/core-nest/guards/user.guard';
import {
  UserJWTPayload,
  CrescoCustomerCustomerInput,
  CrescoCustomerAdminInput,
  CrescoPublicationInput,
  CrescoNotificationInput,
  CrescoTransactionTypeEnum,
  CrescoTransactionStatus,
} from 'src/schema';
@Resolver()
export class CrescoMutations {
  constructor(
    private readonly userService: UserEntityService,
    private readonly crescoNotificationService: CrescoNotificationEntityService,
    private readonly crescoPortfolioStateService: CrescoPortfolioStateEntityService,
    private readonly crescoCustomerService: CrescoCustomerEntityService,
    private readonly crescoTransactionService: CrescoTransactionEntityService,
    private readonly crescoExternalCoinRateService: CrescoExternalCoinRateEntityService,
    private readonly crescoExternalCoinRateHistoryService: CrescoExternalCoinRateHistoryEntityService,
    private readonly crescoBaseService: CrescoBaseService,
    private readonly senderSmtpService: SenderSmtpService,
    private readonly configService: ConfigService,
    private readonly crescoTokenRateService: CrescoTokenRateEntityService,
    private readonly crescoTokenRateCalculatorService: CrescoTokenRateCalculatorService,
    private readonly crescoNotificationsSenderService: CrescoNotificationsSenderService,
    private readonly crescoPublicationService: CrescoPublicationEntityService,
  ) {}
  @Mutation()
  async crescoCustomerUpsertMyProfile(
    @UserData() user: UserJWTPayload,
    @Args('input') input: CrescoCustomerCustomerInput,
  ): Promise<string> {
    console.log('crescoCustomerUpsertMyProfile', user, input);
    await this.crescoCustomerService.mongoose.updateOne(
      { userUri: `email://${user.email}` },
      { $set: fillDefinedAndNotNull(input) },
    );
    return 'ok';
  }
  @OnlyAdmin()
  @Mutation()
  async crescoAdminUpsertCustomerProfile(
    @UserData() user: UserJWTPayload,
    @Args('input') input: CrescoCustomerAdminInput,
  ): Promise<string> {
    const prevState = await this.crescoCustomerService.mongoose.findOne({
      userUri: input.userUri,
    });
    const prevBalance = prevState.crescoTokenBalance ?? 0;

    await this.crescoCustomerService.mongoose.updateOne(
      { userUri: input.userUri },
      { $set: fillDefinedAndNotNull(input) },
    );
    if ((input.crescoTokenBalance ?? 0) > prevBalance)
      await this.crescoNotificationsSenderService.sendNotificationToUser({
        userUri: input.userUri,
        title: 'Cresco tokens purchase request confirmation',
        text: `Congratulations, you have been fortunate to buy ${
          input.crescoTokenBalance - prevBalance
        } CRESCO tokens. All the information about your CRESCO portfolio and analytical reviews you can see in your CRESCO account `,
        emotion: 1,
      });
    return 'ok';
  }
  @OnlyAdmin()
  @Mutation()
  async crescoAdminUpsertPublication(
    @UserData() user: UserJWTPayload,
    @Args('input') input: CrescoPublicationInput,
  ): Promise<string> {
    await this.crescoPublicationService.mongoose.findOneAndUpdate(
      { id: input.id },
      {
        $set: fillDefinedAndNotNull({
          ...input,
          createdAt: new Date(),
          id: randomUUID(),
        }),
      },
      { upsert: true },
    );
    await this.crescoNotificationsSenderService.broadcastNotification({
      text: 'Read our new analytical review in your CRESCO account',
    });
    return 'ok';
  }
  @OnlyAdmin()
  @Mutation()
  async crescoAdminCreateNewPortfolioState(
    @UserData() user: UserJWTPayload,
    @Args('coinBalances') coinBalances: Record<string, unknown>,
    @Args('crescoTokensOverallAmount') crescoTokensOverallAmount: number,
  ): Promise<string> {
    const ps = {
      currenciesAmountsHashmap: coinBalances,
      createdByUserUri: `email://${user.email}`,
      createdAt: new Date(),
      crescoTokensOverallAmount,
    };
    await this.crescoPortfolioStateService.mongoose.create(ps);
    await this.crescoTokenRateCalculatorService.updateCrescoTokenRateOnNewPortfolioState(
      ps,
    );
    await this.crescoNotificationsSenderService.broadcastNotification({
      text: 'Your crypto portfolio has been changed',
    });
    // await this.senderSmtpService.broadcastToAllCrescoCustomers({
    //   text:"Cresco analytics has just updated the portfilio ",
    //   html:"",
    //   subject:`Portfolio enhanced!`,
    // })
    return 'ok';
  }

  @OnlySuperAdmin()
  @Mutation()
  async crescoAdminSetAdminRoles(
    @UserData() user: UserJWTPayload,
    @Args('userUri') userUri: string,
    @Args('roles') roles: string[],
  ): Promise<string> {
    if (user.userUri === userUri) throw 'cannot change own role';
    await this.userService.mongoose.findOneAndUpdate(
      { email: userUri.replace('email://', '') },
      { roles },
    );
    return 'ok';
  }

  @OnlyAdmin()
  @Mutation()
  async crescoAdminSendNotification(
    @UserData() user: UserJWTPayload,
    @Args('input') input: CrescoNotificationInput,
    @Args('isBroadcast') isBroadcast: boolean,
  ): Promise<string> {
    console.log('crescoAdminSendNotification', input);
    if (isBroadcast) {
      await this.crescoNotificationsSenderService.broadcastNotification({
        ...input,
      });
      await this.senderSmtpService.broadcastToAllCrescoCustomers({
        subject: input.title ?? 'Cresco notification',
        text: `${input.text} ${input.cta}`,
        html: input.cta
          ? `${input.text} <a href="${input.ctaUrl}">${input.cta}</a>`
          : input.text,
      });
    }
    await this.crescoNotificationsSenderService.sendNotificationToUser({
      ...input,
    });
    return 'ok';
  }
  @Mutation()
  async crescoCustomerTransactionCreate(
    @UserData() user: UserJWTPayload,
    @Args('transactionType') transactionType: CrescoTransactionTypeEnum,
    @Args('amountCrescoTokens') amountCrescoTokens: number,
    @Args('customerWallet') customerWallet: string,
  ): Promise<string> {
    const customer = await this.crescoCustomerService.mongoose.findOne({
      email: `email://${user.email}`,
    });
    if (!customer || !customerWallet) throw 'Please set wallet address first';
    const rate =
      await this.crescoTokenRateCalculatorService.getLastCrescoTokenRate();
    if (transactionType === CrescoTransactionTypeEnum.CLIENT_SELL_TOKENS) {
      await this.crescoTransactionService.mongoose.create({
        userUri: `email://${user.email}`,
        transactionType,
        amountCrescoTokens,
        amountUSDT: amountCrescoTokens * rate,
        fromWallet: '0x542a3fd9a7073599cc2fd332a8091490a66c63c3',
        toWallet: customerWallet,
        createdAt: new Date(),
      });
      await this.crescoNotificationsSenderService.sendNotificationToUser({
        userUri: `email://${user.email}`,
        text: `Request to SELL ${amountCrescoTokens.toFixed(0)} Cresco Tokens has been created`,
        emotion: 0,
      });
    }
    if (transactionType === CrescoTransactionTypeEnum.CLIENT_BUY_TOKENS) {
      const amountUSDT = Math.round(amountCrescoTokens * rate * 100) / 100;
      await this.crescoTransactionService.mongoose.create({
        userUri: `email://${user.email}`,
        transactionType,
        amountCrescoTokens,
        amountUSDT,
        fromWallet: customerWallet,
        toWallet: '0x542a3fd9a7073599cc2fd332a8091490a66c63c3',
        createdAt: new Date(),
      });
      await this.crescoNotificationsSenderService.sendNotificationToUser({
        userUri: `email://${user.email}`,
        text: `Request to BUY tokens on ${amountUSDT.toFixed(1)} USDT has been created`,
        emotion: 0,
      });
    }
    return 'ok';
  }

  @OnlyAdmin()
  @Mutation()
  async crescoAdminTransactionSetStatus(
    @UserData() user: UserJWTPayload,
    @Args('transactionId') transactionId: string,
    @Args('status') status: CrescoTransactionStatus,
  ): Promise<string> {
    const trans = await this.crescoTransactionService.mongoose.findOne({
      _id: transactionId,
    });
    await this.crescoTransactionService.mongoose.updateOne(
      { _id: transactionId },
      { status },
    );
    const usdtValue =
      trans.amountCrescoTokens *
      (await this.crescoTokenRateCalculatorService.getLastCrescoTokenRate());
    console.log('getLastCrescoTokenRate', usdtValue);
    if (status === CrescoTransactionStatus.APPROVED) {
      if (
        trans.transactionType === CrescoTransactionTypeEnum.CLIENT_BUY_TOKENS
      ) {
        const rate =
          await this.crescoTokenRateCalculatorService.getLastCrescoTokenRate();
        const tokens = (usdtValue / rate).toFixed(1);

        await this.crescoCustomerService.mongoose.updateOne(
          { userUri: trans.userUri },
          {
            $inc: {
              crescoTokenBalance: tokens,
              overallUSDTInvestments: usdtValue,
            },
          },
        );
        await this.crescoNotificationsSenderService.sendNotificationToUser({
          userUri: trans.userUri,
          title: 'Receipt confirmation',
          text: `We confirm the receipt of ${
            trans.amountUSDT
          } USDT and enroll you ${parseFloat(tokens).toFixed(0)} CRESCO tokens (${rate.toFixed(
            1,
          )} USDT each)`,
          emotion: 1,
        });
        // await this.crescoNotificationsSenderService.sendNotificationToUser({
        //   userUri: trans.userUri,
        //   title: 'Cresco tokens purchase request confirmation',
        //   text: `Congratulations, you have been fortunate to buy ${trans.amountCrescoTokens} CRESCO tokens. All the information about your CRESCO portfolio and analytical reviews you can see in your CRESCO account `,
        //   emotion: 1,
        // });
      }
      if (
        trans.transactionType === CrescoTransactionTypeEnum.CLIENT_SELL_TOKENS
      ) {
        await this.crescoCustomerService.mongoose.updateOne(
          { userUri: trans.userUri },
          {
            $inc: {
              crescoTokenBalance: -trans.amountCrescoTokens,
              overallUSDTInvestments: -usdtValue,
            },
          },
        );
        await this.crescoNotificationsSenderService.sendNotificationToUser({
          userUri: trans.userUri,
          title: 'Withdrawal request confirmation',
          text: `We confirm the receipt of your request to withdraw ${trans.amountCrescoTokens.toFixed(0)} Cresco Tokens. ${trans.amountUSDT.toFixed(1)} USDT have been transferred to your wallet`,
          emotion: 1,
        });
      }
    }
    if (status === CrescoTransactionStatus.PRE_APPROVED) {
      if (
        trans.transactionType === CrescoTransactionTypeEnum.CLIENT_BUY_TOKENS
      ) {
        // await this.crescoCustomerService.mongoose.updateOne(
        //   { userUri: trans.userUri },
        //   {
        //     $inc: {
        //       crescoTokenBalance: trans.amountCrescoTokens,
        //       overallUSDTInvestments: usdtValue,
        //     },
        //   },
        // );
        await this.crescoNotificationsSenderService.sendNotificationToUser({
          userUri: trans.userUri,
          title: 'Receipt pre-approval',
          text: `We confirm the receipt of ${trans.amountUSDT.toFixed(1)} USDT. Your CRESCO TOKENS will be credited to your account at the appropriate time in accordance with the management strategy.`,
          emotion: 1,
        });
        // await this.crescoNotificationsSenderService.sendNotificationToUser({
        //   userUri: trans.userUri,
        //   title: 'Cresco tokens purchase request confirmation',
        //   text: `Congratulations, you have been fortunate to buy ${trans.amountCrescoTokens} CRESCO tokens. All the information about your CRESCO portfolio and analytical reviews you can see in your CRESCO account `,
        //   emotion: 1,
        // });
      }
      if (
        trans.transactionType === CrescoTransactionTypeEnum.CLIENT_SELL_TOKENS
      ) {
        // await this.crescoCustomerService.mongoose.updateOne(
        //   { userUri: trans.userUri },
        //   {
        //     $inc: {
        //       crescoTokenBalance: -trans.amountCrescoTokens,
        //       overallUSDTInvestments: -usdtValue,
        //     },
        //   },
        // );
        await this.crescoNotificationsSenderService.sendNotificationToUser({
          userUri: trans.userUri,
          title: 'Withdrawal request pre-approval',
          text: `We confirm the receipt of your request to withdraw ${trans.amountCrescoTokens.toFixed(0)} Cresco Tokens.`,
          emotion: 1,
        });
      }
    }
    if (status === CrescoTransactionStatus.FAILED) {
      await this.crescoNotificationsSenderService.sendNotificationToUser({
        userUri: trans.userUri,
        text: `Transaction for ${trans.amountCrescoTokens.toFixed(0)} Cresco Tokens has been rejected`,
        emotion: -1,
      });
    }
    return 'ok';
  }

  @OnlySuperAdmin()
  @Mutation()
  async crescoTestInitData(@UserData() user: UserJWTPayload): Promise<string> {
    // await this.userService.initData(20);
    await this.crescoTransactionService.initData(30);
    await this.crescoCustomerService.initData(20);
    await this.crescoPortfolioStateService.initData(20);
    await this.crescoNotificationService.initData(0);
    await this.crescoTokenRateService.initData(100);
    // await this.crescoPublicationService.initData(20);
    return 'ok';
  }

  @Mutation()
  async crescoCustomerClassicRequestUSDTDeposit(
    @UserData() user: UserJWTPayload,
    @Args('agreementNo') agreementNo: string,
    @Args('walletAddress') walletAddress: string,
    @Args('amount') amount: number,
  ): Promise<string> {
    const adminEmail = this.configService.get('cresco.adminEmail');
    const text = `Client with agreement number ${agreementNo} said he sent ${amount.toFixed(1)} from ${walletAddress} to Cresco wallet. Please contact him.`;
    const info = await this.senderSmtpService.sendEmail({
      to: adminEmail,
      subject: 'USDT Deposit request',
      text,
      html: text,
    });
    console.log(info);
    return 'ok';
  }
  @Mutation()
  async crescoCustomerClassicRequestFullReport(
    // @UserData() user: UserJWTPayload,
    @Args('agreementNo') agreementNo: string,
  ): Promise<string> {
    const adminEmail = this.configService.get('cresco.adminEmail');
    const text = `Client with agreement number ${agreementNo} requested full report. Please contact him.`;
    const info = await this.senderSmtpService.sendEmail({
      to: adminEmail,
      subject: 'User requested Full report',
      text,
      html: text,
    });
    console.log(info);
    return 'ok';
  }
  @Mutation()
  async crescoCustomerClassicRequestWithdrawal(
    @UserData() user: UserJWTPayload,
    @Args('agreementNo') agreementNo: string,
  ): Promise<string> {
    return null as any;
  }
}
