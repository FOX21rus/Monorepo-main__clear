import { Injectable } from '@nestjs/common';
import { parse as parseQuery } from 'querystring';
import { createHmac } from 'crypto';

@Injectable()
export class AuthTelegramWebappService {
  parseInitData(initData: string) {
    const decoded = decodeURIComponent(initData);
    const parsed = parseQuery(decoded);
    if (!parsed?.user) throw 'invalid telegram init data';
    parsed.user = JSON.parse(parsed.user as any);
    return parsed as unknown as {
      query_id: string;
      user: {
        id: number;
        first_name: string;
        last_name: string;
        username: string;
        language_code: string;
        is_premium: string;
      };
      auth_date: string;
      hash: string;
    };
  }

  validateInitData = (
    telegramInitData: string,
    telegramBotToken: string,
  ): boolean => {
    // The data is a query string, which is composed of a series of field-value pairs.
    const encoded = decodeURIComponent(telegramInitData);

    // HMAC-SHA-256 signature of the bot's token with the constant string WebAppData used as a key.
    const secret = createHmac('sha256', 'WebAppData').update(telegramBotToken);

    // Data-check-string is a chain of all received fields'.
    const arr = encoded.split('&');
    const hashIndex = arr.findIndex((str) => str.startsWith('hash='));
    const hash = arr.splice(hashIndex)[0].split('=')[1];
    // sorted alphabetically
    arr.sort((a, b) => a.localeCompare(b));
    // in the format key=<value> with a line feed character ('\n', 0x0A) used as separator
    // e.g., 'auth_date=<auth_date>\nquery_id=<query_id>\nuser=<user>
    const dataCheckString = arr.join('\n');

    // The hexadecimal representation of the HMAC-SHA-256 signature of the data-check-string with the secret key
    const _hash = createHmac('sha256', secret.digest())
      .update(dataCheckString)
      .digest('hex');

    // if hash are equal the data may be used on your server.
    // Complex data types are represented as JSON-serialized objects.
    return _hash === hash;
  };
}
