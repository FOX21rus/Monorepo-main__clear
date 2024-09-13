import { CrescoCustomerMongooseRecord } from '../mongoose/cresco-customer.mongoose.record';
import { randInt } from '../../../_common/randomizers/rand-int';
import { randomName } from '../../../_common/randomizers/random-names';
import { CrescoCustomer } from '../../../schema';
import { randomDates } from '../../../_common/randomizers/random-dates';
import { userExampleGetEmailUri } from '../../user/examples/user.examples';

export const crescoCustomerExampleGetId = (i: number) => `cresco-customer-${i}`;
export const crescoCustomerExampleWalletAddress = (i: number) =>
  `0x3d80b31a78c30fc628f20b2c89d7ddbf6e53c${String(i).padStart(3, '0')}`;

export const crescoCustomerExamplesFactory = (qty: number) => {
  const crescoCustomerExampleRecords = [] as CrescoCustomer[];
  for (let i = 0; i < qty; i++) {
    // const id = crescoCustomerExamplesFactory(i);
    const example = new CrescoCustomer();
    example.userUri = userExampleGetEmailUri(i);
    example.crescoTokenBalance = randInt(0, 20);
    const { firstName, lastName, middleName } = randomName();
    example.firstName = firstName;
    example.lastName = lastName;
    example.overallUSDTInvestments = example.crescoTokenBalance * 1;
    example.middleName = middleName;
    example.managerFullName = randomName().fio;
    example.walletAddress = crescoCustomerExampleWalletAddress(i);
    example.agreementUrl = [{ name: 'test.pdf', url: 'https://ya.ru' }];
    example.agreementNo = `agreement-${i} 01.01.2011`;
    example.signedAgreementUrl = [{ name: 'test.pdf', url: 'https://ya.ru' }];
    const dates = randomDates(3, 1, false);
    example.isPassportVerified = Math.random() > 0.5;
    crescoCustomerExampleRecords.push(example);

    // example.
  }
  return crescoCustomerExampleRecords;
};
