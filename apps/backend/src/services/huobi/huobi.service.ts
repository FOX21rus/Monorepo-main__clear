import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CrescoExternalCoinRateEntityService } from '../../entities/cresco-external-coin-rate/cresco-external-coin-rate.entity.service';
import { CrescoExternalCoinRateHistoryEntityService } from '../../entities/cresco-external-coin-rate-history/cresco-external-coin-rate-history.entity.service';
import { Cron } from '@nestjs/schedule';
import { CrescoTokenRateCalculatorService } from '../cresco-token-rate-calculator/cresco-token-rate-calculator.service';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { symbolsExample } from './data/symbols.example';
import { randInt } from '../../_common/randomizers/rand-int';
import * as process from 'process';

const detailExample = {
  ch: 'market.btcusdt.detail',
  status: 'ok',
  ts: 1659617098160,
  tick: {
    id: 317691557418,
    low: 22724.14,
    high: 23577.18,
    open: 23349.43,
    close: 22874.69,
    vol: 208952025.6852682,
    amount: 9032.347266721916,
    version: 317691557418,
    count: 180992,
  },
};
const lastTradeExample = {
  ch: 'market.btcusdt.trade.detail',
  status: 'ok',
  ts: 1659618393958,
  tick: {
    id: 158854927466,
    ts: 1659618393195,
    data: [
      {
        id: 1.5885492746659974e26,
        ts: 1659618393195,
        'trade-id': 102730753044,
        amount: 0.003896,
        price: 22868.78,
        direction: 'sell',
      },
      {
        id: 1.5885492746659974e26,
        ts: 1659618393195,
        'trade-id': 102730753043,
        amount: 0.01,
        price: 22868.78,
        direction: 'sell',
      },
    ],
  },
};

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//https://open.huobigroup.com/?name=currency
@Injectable()
export class HuobiService {
  constructor(
    private readonly crescoExternalCoinRateService: CrescoExternalCoinRateEntityService,
    private readonly crescoExternalCoinRateHistoryService: CrescoExternalCoinRateHistoryEntityService,
    private readonly crescoTokenRateCalculatorService: CrescoTokenRateCalculatorService,
    private readonly configService: ConfigService,
  ) {}
  //https://api.huobi.pro/market/detail?symbol=btcusdt
  async getSymbols() {
    // return symbolsExample.data;
    const { url, headers } = this.signedRequest(
      `https://api.huobi.pro/v1/common/currencys`,
    );
    const res = await axios.get(url, { headers }).then((d) => d.data?.data);
    return res as any;
  }

  signedRequest(url, data = {} as any, method = 'GET') {
    const Huobi = {
      options: {
        APIKEY: process.env.CRESCO_HUOBI_KEY,
        APISECRET: process.env.CRESCO_HUOBI_SECRET_KEY,
      },
    };
    if (!Huobi.options.APIKEY) throw Error('apiRequest: Invalid API Key');
    if (!Huobi.options.APISECRET)
      throw Error('signedRequest: Invalid API Secret');

    data.Timestamp = new Date().toISOString().replace(/\..+/, ''); //.getTime()+ Huobi.info.timeOffset;
    data.SignatureMethod = 'HmacSHA256';
    data.SignatureVersion = 2;
    data.AccessKeyId = Huobi.options.APIKEY;

    let query = Object.keys(data)
      .sort((a, b) => (a > b ? 1 : -1))
      .reduce(function (a, k) {
        a.push(k + '=' + encodeURIComponent(data[k]));
        return a;
      }, [])
      .join('&');

    const site = 'api.huobi.pro';
    const base = 'https://' + site;
    let source =
      method + '\n' + site + '\n' + url.replace(base, '') + '\n' + query;
    //console.log("source %s",source);
    let signature = crypto
      .createHmac('sha256', Huobi.options.APISECRET)
      .update(source)
      .digest('base64'); //digest('hex'); // set the HMAC hash header
    signature = encodeURIComponent(signature);
    //console.log("Signature %s",signature);

    const userAgent =
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36'; //'Mozilla/4.0 (compatible; Node Huobi API)';
    const contentType = 'application/x-www-form-urlencoded';
    const headers = {
      'User-Agent': userAgent,
      'Content-type': contentType,
      'X-MBX-APIKEY': process.env.CRESCO_HUOBI_KEY,
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    };

    return { url: url + '?' + query + '&Signature=' + signature, headers };
  }

  async getSymbolToUSDT(symbol: string) {
    const { url, headers } = this.signedRequest(
      `https://api.huobi.pro/market/detail`,
      { symbol: `${symbol}usdt` },
    );
    return axios
      .get(url, { headers })
      .then((d) => d.data as typeof detailExample);
  }
  async getSymbolLastTradeToUSDT(symbol: string) {
    const { url, headers } = this.signedRequest(
      `https://api.huobi.pro/market/trade`,
      { symbol: `${symbol}usdt` },
    );
    return axios
      .get(url, { headers, timeout: 5000 })
      .then((d) => d.data as typeof lastTradeExample);
  }

  // @Cron('0 3 * * * *')
  // async getSymbols1() {
  //   await this.getAllSymbolsData(0, 40);
  //   await this.crescoTokenRateCalculatorService.updateCrescoTokenRateAfterExternalRateChanges();
  // }
  //
  // @Cron('0 5 * * * *')
  // async getSymbols2() {
  //   await this.getAllSymbolsData(40, 80);
  // }
  // @Cron('0 6 * * * *')
  // async getSymbols3() {
  //   await this.getAllSymbolsData(80, 120);
  // }
  // @Cron('0 7 * * * *')
  // async getSymbols4() {
  //   await this.getAllSymbolsData(120, 160);
  // }
  // @Cron('0 8 * * * *')
  // async getSymbols5() {
  //   await this.getAllSymbolsData(160, 200);
  // }
  @Cron('10 * * * * *')
  async updateCurrency1() {
    if (process.env?.LOCAL) return;
    console.log('update currency');
    try {
      await this.crescoTokenRateCalculatorService.updateCrescoTokenRateAfterExternalRateChanges();
    } catch (e) {}
  }

  @Cron('*/30 * * * * *')
  async getSymbols5() {
    if (process.env?.LOCAL) return;
    // return;
    // if (process.env.huobiRound===undefined) process.env.huobiRound=randInt(0,Math.floor(symbolsExample.data.length/10)-1).toString()
    try {
      if (process.env.huobiRound === undefined) process.env.huobiRound = '0';
      process.env.huobiRound = (
        parseInt(process.env.huobiRound) + 1
      ).toString();
      console.log(process.env.huobiRound);
      const round = parseInt(process.env.huobiRound);
      if (round > symbolsExample.data.length / 10) {
        process.env.huobiRound = '0';
      }
      await this.getAllSymbolsData((round - 1) * 10, round * 10);
    } catch (e) {}
  }

  async getAllSymbolsData(from = 0, to = 40) {
    const sym = symbolsExample.data;

    const symbols = sym.filter((s, i) => from <= i && i < to);
    console.log(symbols.join(','));
    const p = symbols.map((s) => this.getSymbolLastTradeToUSDT(s));
    let i = 0;
    const upd = [] as any;
    const upd2 = [] as any;
    for await (let res of p) {
      const name = symbols[i];
      if (!res) return 'no res for ' + symbols[i];
      let rate = res.tick?.data?.[0].price;
      // if (!rate){
      //   const yesterday = await this.getSymbolToUSDT(symbols[i])
      //   rate = yesterday?.tick?.close
      //
      // }
      console.log(symbols[i], rate);
      if (rate > 0)
        upd.push(
          this.crescoExternalCoinRateService.mongoose.findOneAndUpdate(
            { name },
            { displayName: name, name, rate },
            { upsert: true },
          ),
        );

      // await timeout(200);
      i++;
    }
    await Promise.all(upd);
    await this.crescoExternalCoinRateService.mongoose.findOneAndUpdate(
      { name: 'usdt' },
      { displayName: 'usdt', name: 'usdt', rate: 1 },
      { upsert: true },
    );
  }
}
