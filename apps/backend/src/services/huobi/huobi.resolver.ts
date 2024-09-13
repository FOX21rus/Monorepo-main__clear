import { Query, Resolver } from '@nestjs/graphql';
import { HuobiService } from './huobi.service';

@Resolver()
export class HuobiResolver {
  constructor(private readonly huobiService: HuobiService) {}

  @Query()
  async huobiGetData() {

    const d = await this.huobiService.getAllSymbolsData(100,110)

    // const d = await this.huobiService.getSymbolLastTradeToUSDT("btc")
    // const res = this.huobiService.signedRequest("https://api.huobi.pro/market/detail",{symbol:"BTCUSDT"})
    return "ok";
  }
}
