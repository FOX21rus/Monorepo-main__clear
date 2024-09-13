import { TelegramMessageMongooseRecord } from "../mongoose/telegram-message.mongoose.record";

export const telegramMessageExampleGetId = (i: number) =>
  `telegram-message-${i}`;

export const telegramMessageExamplesFactory = (qty: number) => {
  const telegramMessageExampleRecords = [] as TelegramMessageMongooseRecord[];
  for (let i = 0; i < qty; i++) {
    const id = telegramMessageExamplesFactory(i);
    const example = new TelegramMessageMongooseRecord();
  }
  return telegramMessageExampleRecords;
};
