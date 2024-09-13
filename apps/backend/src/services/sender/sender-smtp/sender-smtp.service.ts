import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import {DashamailService} from "../dashamail/dashamail.service";
import {CrescoCustomerEntityService} from "../../../entities/cresco-customer/cresco-customer.entity.service";

@Injectable()
export class SenderSmtpService {
  constructor(
      private readonly configService: ConfigService,
      private readonly dashamailService:DashamailService,
      private readonly crescoCustomerEntityService:CrescoCustomerEntityService
  ) {}
  async broadcastToAllCrescoCustomers(params:{ subject: string;
    text: string;
    html: string;}){
    const emailsCustomers  = await this.crescoCustomerEntityService.mongoose.find({},{userUri:1});
    const emails = emailsCustomers
        .filter(e=>e.userUri.match("email"))
        .map(e=>e.userUri.replace("email://",""))
        .filter(e=>!e.match('domain.com')).join(', ');
    await this.sendEmail({...params,to:emails})
    return "ok"

  }
  async sendEmail(params: {
    // from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
  }) {
    const { to, subject, text, html } = params;
    await this.dashamailService.dashamailSendMail({
      email:to,subject,text,html
    })

    // const config = this.configService.get('sender.smtp');
    // let transporter = nodemailer.createTransport(config);
    // let info = await transporter.sendMail({
    //   from: config.auth.user,
    //   to,
    //   subject,
    //   text,
    //   html,
    // });
    // return info;
    return "ok"
  }
}
