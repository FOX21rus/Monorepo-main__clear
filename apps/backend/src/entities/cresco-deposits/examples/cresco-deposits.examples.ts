import { CrescoDepositsMongooseRecord } from "../mongoose/cresco-deposits.mongoose.record";

export const crescoDepositsExampleGetId = (i: number) => `cresco-deposits-${i}`;

export const crescoDepositsExamplesFactory = (qty: number) => {
  const crescoDepositsExampleRecords = [] as CrescoDepositsMongooseRecord[];
  for (let i = 0; i < qty; i++) {
    const id = crescoDepositsExampleGetId(i);
    const example = new CrescoDepositsMongooseRecord();
  }
  return crescoDepositsExampleRecords;
};
