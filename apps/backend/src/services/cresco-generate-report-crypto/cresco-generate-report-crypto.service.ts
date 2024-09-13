import { Injectable } from '@nestjs/common';
import * as XlsxTemplate from 'xlsx-template';
import * as fs from 'fs';
import { CrescoTokenRateCalculatorService } from '../cresco-token-rate-calculator/cresco-token-rate-calculator.service';
import { CrescoCustomerEntityService } from '../../entities/cresco-customer/cresco-customer.entity.service';
import * as moment from 'moment';

export interface GenerateReportCryptoInput {
  fio: string;
  code: string;
  from: string;
  to: string;
  comment: string;
  agreementNo: string;
  total: number;
  deltaPercent: number;
  assets: {
    coinName: string;
    coinNameUSDT: string;
    coinShare: string;
    value: number;
  }[];
}
interface GenerateReportDynamicsInput {
  from: string;
  fio: string;
  to: string;
  dynamics: {
    date: string;
    value: string;
  }[];
}
@Injectable()
export class CrescoGenerateReportCryptoService {
  constructor(
    private readonly crescoTokenRateCalculatorService: CrescoTokenRateCalculatorService,
    private readonly crescoCustomerService: CrescoCustomerEntityService,
  ) {}
  generateReportCrypto(values: GenerateReportCryptoInput) {
    const template = fs.readFileSync(
      'src/services/cresco-generate-report-crypto/data/crypto-report.xlsx',
    );

    const xlsx = new XlsxTemplate(template);
    const sheetNumber = 1;

    xlsx.substitute(sheetNumber, values);
    const bin = xlsx.generate({ type: 'nodebuffer' } as any);

    return bin;
  }

  generateReportDynamics(values: GenerateReportDynamicsInput, isFull=false) {
    const template = fs.readFileSync(
      `src/services/cresco-generate-report-crypto/data/${isFull?"full-":""}dynamics-report.xlsx`,
    );

    const xlsx = new XlsxTemplate(template);
    const sheetNumber = 1;

    xlsx.substitute(sheetNumber, values);
    const bin = xlsx.generate({ type: 'nodebuffer' } as any);

    return bin;
  }


  async generateReportCryptoForUserUri(
    userUri: string,
    from: string,
    to: string,
  ) {
    const input =
      await this.crescoTokenRateCalculatorService.calculateStatsForUserUri(
        userUri,
      );
    console.log(input);
    return this.generateReportCrypto({ ...input, from, to });
  }

  async generateReportDynamicsForUserUri(
    userUri: string,
    from: string,
    to: string,
  ) {
    const days = moment(to.split('.').reverse().join('/')).diff(
      moment(from.split('.').reverse().join('/')),
      'days',
    );
    const dynamics = [];
    for (let i = 0; i < days + 1; i++) {
      dynamics.push({
        date: moment(from.split('.').reverse().join('/'))
          .add(i, 'days')
          .format('DD.MM.YYYY'),
        value: '',
      });
    }

    const customer = await this.crescoCustomerService.mongoose.findOne({
      userUri,
    });
    const fio = [customer.lastName, customer.firstName, customer.middleName]
      .filter(Boolean)
      .join(' ');
    return this.generateReportDynamics({ fio, from, to, dynamics });
  }

  async generateReportFundFull(
      userUri: string,
      from: string,
      to: string,
  ) {
    const days = moment(to.split('.').reverse().join('/')).diff(
        moment(from.split('.').reverse().join('/')),
        'days',
    );
    // const dynamics = [];
    const values = await this.crescoTokenRateCalculatorService.getPortfolioValue(moment(from.split('.').reverse().join('/')).toDate(),moment(from.split('.').reverse().join('/')).add(days,'days').toDate())
    const dynamics = values.map(v=>({date:v._id,value:v.value.toFixed(2)}))
    //
    // for (let i = 0; i < days + 1; i++) {
    //   dynamics.push({
    //     date: moment(from.split('.').reverse().join('/'))
    //         .add(i, 'days')
    //         .format('DD.MM.YYYY'),
    //     value: '',
    //   });
    // }
    const fio = ""
    console.log(dynamics)
    return this.generateReportDynamics({ fio, from, to, dynamics },true);
  }
}
