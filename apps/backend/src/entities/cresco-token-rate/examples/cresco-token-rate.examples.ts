import { CrescoTokenRateMongooseRecord } from '../mongoose/cresco-token-rate.mongoose.record';
import * as moment from 'moment';

export const crescoTokenRateExampleGetId = (i: number) =>
  `cresco-token-rate-${i}`;

export const crescoTokenRateExamplesFactory = (qty: number) => {
  const crescoTokenRateExampleRecords = [] as CrescoTokenRateMongooseRecord[];
  for (let i = 0; i < qty; i++) {
    // const id = crescoTokenRateExampleGetId(i);
    const example = new CrescoTokenRateMongooseRecord();
    example.rateUSDT = 1 + i / 3 + (Math.random() * i) / 4;
    example.ts = moment()
      .subtract(qty - i, 'days')
      .toISOString();
    example.crescoTokensAmount = 1000;
    crescoTokenRateExampleRecords.push(example);
  }

  return crescoTokenRateExampleRecords;
};
