import { randIntStr, randPos } from './rand-int';
import * as RandomTextGenerator from 'random-text-generator';

export const randomText = () => {
  const randomTextGenerator = new RandomTextGenerator({
    splitter: ' ',
    deepness: 8,
    minLength: 200,
    maxLength: 400,
  });
  const exemplaryText = `Starting in November 2022, Binance’s Top 10 Equal-Weighted Index will be available to investors through Auto-Invest, to track the performance of the top 10 cryptocurrencies. Crypto exchange Binance announced it will launch its first index product, the Top 10 Equal-Weighted Index, to kick off its Binance CoinMarketCap (CMC) Index Series.

The Top 10 Equal-Weighted Index will monitor the performance of the industry’s top 10 cryptocurrencies by market capitalization, such as Bitcoin. Binance indices will utilize pricing information from crypto price tracker CMC, of which the crypto exchange is the owner.

According to the announcement, the Equal-Weighted Index will be rebalanced monthly and is designed to help investors evaluate price and performance. The index products, beginning with the Top 10 Equal-Weighted Index, will be available to investors starting in November 2022 through Binance’s Auto-Invest service.

In the future, Binance says the community can expect more from the index series, which will encompass more digital assets in a diverse set of products. Despite a long and harsh crypto winter, Binance and other major crypto-industry giants have been developing their service offerings to the wider community.

A recent Q3 2022 report from the Web3 development platform Alchemy reported that this year could actually be the biggest year on record for development in the Web3 space.

Binance recently expanded its service offerings in multiple markets around the world. On Oct. 6, Kazakhstan granted the exchange a permanent license to offer digital asset services, while in the Middle East, it reported a 49% surge in regional user sign-ups in 2022. Three funds tracking Bitcoin, Ether and FileCoin have been issued interim stop orders by Australia’s market regulator due to non-compliant target market determinations. Australia’s chief financial market regulator has placed interim stop orders on three cryptocurrency-related funds set to be offered to retail investors, due to non-compliant target market determinations (TMDs).

A target market determination is a document that describes who a product is appropriate for, based on likely needs, objectives, and financial situation as well as how the product can be distributed, according to Invest Smart.

In a statement to Cointelegraph, a spokesperson from ASIC said the TMDs were too broad [...] given the volatility and speculative nature of crypto markets.

They added the regulator's concern that Holon has not appropriately considered the features and risks of the funds in determining their target markets.

In its statement, ASIC said it considers the funds not suited to the wide target market defined in the TMDs, including those with a medium, high, or very high risk and return profile, those intending to use the fund as a satellite component — up to 25% of their portfolio, and those who intend to use the fund for 75% to 100% of their investment portfolio.

ASIC added that cryptocurrency funds could see investors exposed to significant negative returns but stated the product disclosure statements (PDS) provided by Holon say they could face a total loss of value.

ASIC made the interim orders to protect retail investors from potentially investing in funds that may not be suitable for their financial objectives, situation or needs, it said, adding that the order would be valid for 21 days unless revoked earlier.

The specifics of what ASIC has requested Holon to change are unclear and the ASIC spokesperson did not provide further details. However, the regulator said it expects Holon to consider the concerns and take immediate steps to ensure compliance.

The interim stop will prevent Holon from sharing a PDS, providing general advice on the funds, or issuing shares of the funds to retail investors.

The regulator also expects Holon to address the concerns within a timely manner otherwise a final stop order will be issued, though Holon will be given the opportunity to make submissions before such an order is made.

A spokesperson from Holon told Cointelegraph the company is not making comments on the matter at this stage.`;

  randomTextGenerator.learn(exemplaryText.split(' '));

  return randomTextGenerator.generate();
};
