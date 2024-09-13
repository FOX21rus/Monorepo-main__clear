import { CrescoTransactionMongooseRecord } from '../mongoose/cresco-transaction.mongoose.record';
import { randInt, randPos } from '../../../_common/randomizers/rand-int';
import { crescoCustomerExampleWalletAddress } from '../../cresco-customer/examples/cresco-customer.examples';
import { userExampleGetEmailUri } from '../../user/examples/user.examples';
import {
  CrescoTransactionStatus,
  CrescoTransactionTypeEnum,
} from '../../../schema';
import { randomDates } from '../../../_common/randomizers/random-dates';

export const crescoTransactionExampleGetId = (i: number) =>
  `cresco-transaction-${i}`;

export const crescoTransactionExamplesFactory = (qty: number) => {
  const crescoTransactionExampleRecords =
    [] as CrescoTransactionMongooseRecord[];
  for (let i = 0; i < qty; i++) {
    // const id = crescoTransactionExamplesFactory(i);
    const example = new CrescoTransactionMongooseRecord();
    const amount = randInt(1, 5);
    example.amountCrescoTokens = amount;
    example.createdAt = randomDates(1, 0.5, true).start;
    example.amountUSDT = amount * 10;
    const isSell = Math.random() > 0.7;
    example.transactionType = isSell
      ? CrescoTransactionTypeEnum.CLIENT_SELL_TOKENS
      : CrescoTransactionTypeEnum.CLIENT_BUY_TOKENS;
    const fromUser = randInt(1, 10);
    if (isSell) {
      example.fromWallet = crescoCustomerExampleWalletAddress(fromUser);
      example.toWallet = crescoCustomerExampleWalletAddress(999);
    } else {
      example.toWallet = crescoCustomerExampleWalletAddress(fromUser);
      example.fromWallet = crescoCustomerExampleWalletAddress(999);
    }

    example.userUri = userExampleGetEmailUri(i);
    const statuses = [
      CrescoTransactionStatus.APPROVED,
      CrescoTransactionStatus.ROBOT_APPROVED,
      CrescoTransactionStatus.PRE_APPROVED,
      CrescoTransactionStatus.PENDING,
      CrescoTransactionStatus.FAILED,
    ];
    example.status = randPos(statuses);
    crescoTransactionExampleRecords.push(example);
  }
  return crescoTransactionExampleRecords;
};
