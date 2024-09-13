import { CrescoPortfolioStateMongooseRecord } from '../mongoose/cresco-portfolio-state.mongoose.record';

export const crescoPortfolioStateExampleGetId = (i: number) =>
  `cresco-portfolio-state-${i}`;

export const crescoPortfolioStateExamplesFactory = (qty: number) => {
  const crescoPortfolioStateExampleRecords =
    [] as CrescoPortfolioStateMongooseRecord[];
  for (let i = 0; i < qty; i++) {
    // const id = crescoPortfolioStateExamplesFactory(i);
    const example = new CrescoPortfolioStateMongooseRecord();
    example.createdAt = new Date();
    example.crescoTokensOverallAmount = 1000;
    example.currenciesAmountsHashmap = {
      eth: 20,
      btc: 3,
    };
    crescoPortfolioStateExampleRecords.push(example);
  }
  return crescoPortfolioStateExampleRecords;
};
