import { Injectable } from '@nestjs/common';
import * as Binance from 'node-binance-api';
import { ConfigService } from '@nestjs/config';
import { CrescoExternalCoinRateEntityService } from '../../entities/cresco-external-coin-rate/cresco-external-coin-rate.entity.service';
import { Cron } from '@nestjs/schedule';
import process from 'process';

@Injectable()
export class BianceService {
  constructor(
    private readonly configService: ConfigService,
    private readonly crescoExternalCoinRateService: CrescoExternalCoinRateEntityService,
  ) {}
  @Cron('*/5 * * * *')
  async getFuturesData() {
    if (process.env?.LOCAL) return;
    try {
      // @ts-ignore
      const binance = new Binance().options({
        APIKEY: this.configService.get('extapis.biance.key'),
        APISECRET: this.configService.get('extapis.biance.secret'),
      });
      const p = await binance.futuresPrices();
      if (p) {
        const promises = Object.entries(p).map(([name, rateStr]) => {
          const extName = `FT${name}`;
          const rate = parseFloat(rateStr as string);
          return this.crescoExternalCoinRateService.mongoose.findOneAndUpdate(
            { name: extName },
            { displayName: extName, name: extName, rate },
            { upsert: true },
          );
        });
        await Promise.all(promises);
      }
      console.log(p);
    } catch (e) {}
  }
}
