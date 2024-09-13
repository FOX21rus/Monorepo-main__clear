import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

const answerExample = {
  blockNumber: '12257711',
  timeStamp: '1618663986',
  hash: '0xc5ee10509a4aa42bc8791234307d8d5983f4f8426a1a158cc65ca8c2561861b0',
  nonce: '4618358',
  blockHash:
    '0x09263a9e355fd2bf4a84bcdd6e2e37a73f0341239080dcf3c7c2f736e9902dd8',
  transactionIndex: '30',
  from: '0xd551234ae421e3bcba99a0da6d736074f22192ff',
  to: '0xf13d7625bf1838c14af331c5a5014aea39cc9a8c',
  value: 0.102 as string|number,
  gas: '207128',
  gasPrice: '177000000000',
  isError: '0',
  txreceipt_status: '1',
  input: '0x',
  contractAddress: '',
  cumulativeGasUsed: '1585806',
  gasUsed: '21000',
  confirmations: '3739588',
  methodId: '0x',
  functionName: '',
};

const answerTokenExample = {
  blockNumber: '15955768',
  timeStamp: '1668278195',
  hash: '0x21ae4a8fe5c71a2544de2e6b918eb30d670c14f255612a83bcae067e2f696c1d',
  nonce: '28',
  blockHash:
    '0x613f9e76c33effdf4bb646e7283ed6c8be799bd057e70010ee3f6fb019df1700',
  from: '0x4b62fa30fea125e43780dc425c2be5acb4ba743b',
  contractAddress: '0x582d872a1b094fc48f5de31d3b73f2d9be47def1',
  to: '0xf13d7625bf1838c14af331c5a5014aea39cc9a8c',
  value: '33301105554' as string|number,
  tokenName: 'Wrapped TON Coin',
  tokenSymbol: 'TONCOIN',
  tokenDecimal: '9',
  transactionIndex: '89',
  gas: '268668',
  gasPrice: '13475365091',
  gasUsed: '198814',
  cumulativeGasUsed: '6898545',
  input: 'deprecated',
  confirmations: '41709',
};

@Injectable()
export class EthCheckTransactionService {
  apiKey: string;
  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get('blockchain.eth.etherscanApiKey');
  }
  async findAllTransactions(toWallet: string) {
    return await axios
      .get(`https://api.etherscan.io/api`, {
        params: {
          module: 'account',
          action: 'txlist',
          address: toWallet,
          startblock: 0,
          endblock: 99999999,
          offset: 0,
          page: 0,
          sort: 'desc',
          apikey: this.apiKey,
        },
      })
      .then((d) => d.data?.result ?? [])
      .then(
        (d) =>
          d
            .filter(
              (trans) =>
                trans.to === toWallet.toLowerCase() &&
                trans.txreceipt_status === '1',
            )
            .map((trans) => ({
              ...trans,
              value: parseInt(trans.value) / Math.pow(10, 18),
            })) as typeof answerExample[],
      );
  }

  async matchUSDTTransaction(fromWallet:string,toWallet:string,amount:number){
    const trans = await this.findAllIncommingUSDTTransfers(toWallet);
    if (!trans) return null;
    const t = trans.find(t=>t.from===fromWallet.toLowerCase()&&Math.abs(parseInt(t.value as any)-amount)<0.01)
    if (!t) return null;
    return `https://etherscan.io/tx/${t.hash}`
  }

  async findAllIncommingUSDTTransfers(toWallet: string) {
    return await axios
      .get(`https://api.etherscan.io/api`, {
        params: {
          module: 'account',
          action: 'tokentx',
          address: toWallet,
          startblock: 0,
          endblock: 99999999,
          offset: 0,
          page: 0,
          sort: 'desc',
          apikey: this.apiKey,
        },
      })
      .then((d) => {
        if (!d.data?.result) throw d.data;
        return d.data?.result ?? [];
      })
      .then(
        (d) =>
          d
            .filter(
              (trans) =>
                trans.to === toWallet.toLowerCase() &&
                // trans.isError === '0',
                // &&
                trans.tokenSymbol === 'USDT',
            )
            .map((trans) => ({
              ...trans,
              value: trans.value / Math.pow(10, 6),
            })) as typeof answerTokenExample[],
      )
      .catch(console.error);
  }
}
