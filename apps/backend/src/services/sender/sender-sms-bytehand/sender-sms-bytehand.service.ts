import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SenderSmsBytehandService {
  constructor(private readonly configService: ConfigService) {}
  async sendSms({ receiver, text }) {
    const { token, sender } = this.configService.get('extapis.bytehand');
    console.log({token,sender,receiver, text})

    try {
      axios
        .post(`https://api.bytehand.com/v2/sms/messages?access_token=${token}`, {
            "sender": sender,
            "receiver": receiver,
            "text": text
        })
        .then((d) => {
          console.log(`send ok`, d.data);
        });
      return 'ok';
    } catch (e) {
      console.error(`unisend error ${JSON.stringify(e.response.data)}`);
      return e;
    }
  }
}
