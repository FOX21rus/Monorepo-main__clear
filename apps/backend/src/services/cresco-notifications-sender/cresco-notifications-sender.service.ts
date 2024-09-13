import { Injectable } from '@nestjs/common';
import { CrescoNotificationEntityService } from '../../entities/cresco-notification/cresco-notification.entity.service';
import { SenderSmtpService } from '../sender/sender-smtp/sender-smtp.service';
import { CrescoCustomerEntityService } from '../../entities/cresco-customer/cresco-customer.entity.service';

@Injectable()
export class CrescoNotificationsSenderService {
  constructor(
    private readonly crescoNotificationService: CrescoNotificationEntityService,
    private readonly senderSmtpService: SenderSmtpService,
    private readonly crescoCustomerEntityService: CrescoCustomerEntityService,
  ) {}

  async broadcastNotification(params: {
    title?: string;
    text: string;
    cta?: string;
    ctaUrl?: string;
    emotion?: number;
  }) {
    const emailsCustomers =
      await this.crescoCustomerEntityService.mongoose.find({}, { userUri: 1 });
    const userUris = emailsCustomers
      .map((u) => u.userUri)
      .filter((e) => e.match('email'));
    await Promise.all(
      userUris.map((userUri) =>
        this.sendNotificationToUser({ ...params, userUri }),
      ),
    );
    return 'ok';
  }

  async sendNotificationToUser(params: {
    userUri: string;
    title?: string;
    text: string;
    cta?: string;
    ctaUrl?: string;
    emotion?: number;
    skipWeb?: boolean;
  }) {
    !params.skipWeb &&
      (await this.crescoNotificationService.mongoose.create({
        ...params,
        createdAt: new Date(),
      }));

    const text = `${params.text} ${params.cta ?? ''} ${params.ctaUrl ?? ''}`;
    const html = params.cta
      ? `${params.text} <a href="${params.ctaUrl}">${params.cta}</a>`
      : `${params.text}`;
    await this.senderSmtpService.sendEmail({
      to: params.userUri.replace('email://', ''),
      text,
      html,
      subject: params.title ?? 'New message',
    });
    return 'ok';
  }
}
