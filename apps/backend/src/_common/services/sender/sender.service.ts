import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

//SendBox credentials
// const config = {
//   client_id: '24a4ffa6cad2f9f997b473cd8b4f7ef4',
//   client_secret: 'c71de20c8bf6afb5461a135cf2264482',
//   grant_type: 'client_credentials',
// };

@Injectable()
export class SenderService {
  constructor(private readonly configService: ConfigService) {}

  async smsRuSendSms(phone: string, text: string) {
    const apiId = this.configService.get('sender.sms.smsRu.apiId');
    return axios
      .get(`https://sms.ru/sms/send`, {
        params: {
          api_id: apiId,
          to: phone,
          msg: text,
          json: 1,
        },
      })
      .then((d) => d.data);
  }

  // constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  //
  // async sendboxGetToken() {
  //   const accessToken = await this.cacheManager.get('sendbox_token');
  //   if (accessToken) {
  //     console.log('prev accessToken', accessToken);
  //     return accessToken;
  //   }
  //   const res = await axios
  //     .post('https://mailer-api.i.bizml.ru/oauth/access_token', config)
  //     .then((d) => d.data)
  //     .catch((e) => {
  //       console.log('ERROR ACCESS TOKEN', e.response.data);
  //     });
  //   if (res.access_token)
  //     await this.cacheManager.set('sendbox_token', res.access_token, {
  //       ttl: 50,
  //     });
  //   else throw 'error getting access token';
  //
  //   return res.access_token;
  // }

  // async sendboxSendSms(phone: string, text: string) {
  //   return;
  //   const token = await this.sendboxGetToken();
  //   //https://mailer-api.i.bizml.ru/sms/send
  //   const res = await axios
  //     .post(
  //       'https://mailer-api.i.bizml.ru/sms/send',
  //       {
  //         phones: [phone],
  //         body: text,
  //         transliterate: 0,
  //         sender: 'BioCharge',
  //       },
  //       { headers: { Authorization: `Bearer ${token}` } },
  //     )
  //     .catch((e) => console.log('ERROR SEND SMS', e.response.data));
  //   console.log(res);
  // }
  //
  // async sendboxSendEmail(
  //   email: string,
  //   name: string,
  //   subject: string,
  //   html: string,
  //   text: string,
  // ) {
  //   console.log(`send email`, email, subject, text);
  //   if (email.match('@domain.com')) {
  //     return;
  //     email = 'nickerlan0@gmail.com';
  //   }
  //   const token = await this.sendboxGetToken();
  //   const emailObject = {
  //     html: new Buffer(html).toString('base64'),
  //     text,
  //     subject,
  //     to: [{ name, email }],
  //     from: {
  //       name: 'outstaffhunter.ru',
  //       email: 'service@outstaffhunter.ru',
  //     },
  //   };
  //   console.log('trySend', emailObject, token);
  //   const res = await axios
  //     .post(
  //       'https://mailer-api.i.bizml.ru/smtp/emails',
  //       {
  //         email: emailObject,
  //       },
  //       { headers: { Authorization: `Bearer ${token}` } },
  //     )
  //     .then((d) => d.data)
  //     .catch((e) => console.error(e.response.data));
  //   console.log(res);
  // }
}
