import { CrescoExternalCoinRateHistoryMongooseRecord } from '../mongoose/cresco-external-coin-rate-history.mongoose.record';
import { CrescoExternalCoinRateMongooseRecord } from '../../cresco-external-coin-rate/mongoose/cresco-external-coin-rate.mongoose.record';
import moment from 'moment';

export const crescoExternalCoinRateHistoryExampleGetId = (i: number) =>
  `cresco-external-coin-rate-history-${i}`;

export const crescoExternalCoinRateHistoryExamplesFactory = (qty: number) => {
  const crescoExternalCoinRateHistoryExampleRecords =
    [] as CrescoExternalCoinRateHistoryMongooseRecord[];
  const rates = {
    eth: 1658,
    btc: 23413,
  };
  for (let i = 0; i < 200; i++) {
    // const id = crescoExternalCoinRateExampleGetId(i);
    const example = new CrescoExternalCoinRateHistoryMongooseRecord();
    example.name = Object.keys(rates)[i % 2];
    example.displayName = Object.keys(rates)[i % 2];
    example.rate =
      Object.values(rates)[i % 2] * (1 + 0.2 * (Math.random() - 0.6));
    example.createdAt = moment().subtract(i * 15, 'minutes');
    crescoExternalCoinRateHistoryExampleRecords.push(example);
  }
  return crescoExternalCoinRateHistoryExampleRecords;
};
