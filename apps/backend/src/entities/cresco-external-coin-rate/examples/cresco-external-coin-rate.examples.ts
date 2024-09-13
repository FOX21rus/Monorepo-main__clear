import { CrescoExternalCoinRateMongooseRecord } from '../mongoose/cresco-external-coin-rate.mongoose.record';

export const crescoExternalCoinRateExampleGetId = (i: number) =>
  `cresco-external-coin-rate-${i}`;

export const crescoExternalCoinRateExamplesFactory = (qty: number) => {
  const crescoExternalCoinRateExampleRecords =
    [] as CrescoExternalCoinRateMongooseRecord[];
  const rates = {
    eth: 1658,
    btc: 23413,
  };
  for (let i = 0; i < 2; i++) {
    // const id = crescoExternalCoinRateExampleGetId(i);
    const example = new CrescoExternalCoinRateMongooseRecord();
    example.name = Object.keys(rates)[i];
    example.displayName = Object.keys(rates)[i];
    example.rate = Object.values(rates)[i];

    crescoExternalCoinRateExampleRecords.push(example);
  }
  return crescoExternalCoinRateExampleRecords;
};
