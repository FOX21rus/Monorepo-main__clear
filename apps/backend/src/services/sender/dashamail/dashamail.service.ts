import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DashamailService {
  constructor(private readonly configService: ConfigService) {}
  async dashamailSendMail({ email, subject, text, html }) {
    const { api_key, from_email } = this.configService.get('extapis.dashamail');
    console.log(`dashamailSendMail ${text} to ${email} from ${from_email}`);
    try {
      axios
        .post('http://api.dashamail.com', {
          method: 'transactional.send',
          api_key,
          from_email,
          to: email,
          subject,
          message: html,
          plain_text: text,
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
