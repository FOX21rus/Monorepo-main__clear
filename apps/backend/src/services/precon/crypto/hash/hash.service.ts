import * as crypto from 'node:crypto';

export class HashService {
  config = {
    secret: 'dief0fee2uw7ahBaicho8ahb4ahb3eey',
  };
  stringToHash(data: string, maxLength = 32) {
    const secret = this.config.secret;
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(data);
    const hash = hmac.digest();

    return hash
      .toString('base64')
      .replace(/[^A-Za-z0-9]/g, '')
      .slice(0, maxLength);
  }
  challengeArray(hash: string, dataArray: string[], maxLength = 32) {
    return dataArray.find(
      (data) => this.stringToHash(data, maxLength) === hash,
    );
  }
}
