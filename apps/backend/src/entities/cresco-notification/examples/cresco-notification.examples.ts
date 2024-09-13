import { CrescoNotificationMongooseRecord } from '../mongoose/cresco-notification.mongoose.record';
import { CrescoNotification } from '../../../schema';
import { userExampleGetEmailUri } from '../../user/examples/user.examples';
import { randomDates } from '../../../_common/randomizers/random-dates';

export const crescoNotificationExampleGetId = (i: number) =>
  `cresco-notification-${i}`;

export const crescoNotificationExamplesFactory = (qty: number) => {
  const crescoNotificationExampleRecords =
    [] as CrescoNotificationMongooseRecord[];
  for (let i = 0; i < qty; i++) {
    // const id = crescoNotificationExamplesFactory(i);
    const example = new CrescoNotification();
    example.title = `Test notification ${i}`;
    example.text = `Test notification text`;
    example.userUri = userExampleGetEmailUri(i % 10);
    example.createdAt = randomDates(0.3, 0.1, true).finish;
    crescoNotificationExampleRecords.push(example);
    // example.ctaUrl=`https://www.ya.ru`
    // example.cta="Acrion link"
  }
  return crescoNotificationExampleRecords;
};
