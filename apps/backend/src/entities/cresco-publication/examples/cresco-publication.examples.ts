import { CrescoPublicationMongooseRecord } from '../mongoose/cresco-publication.mongoose.record';
import { randomDates } from '../../../_common/randomizers/random-dates';
import { randomTextDomain } from '../../../_common/randomizers/random-text-domain';
import { randPos } from '../../../_common/randomizers/rand-int';

export const crescoPublicationExampleGetId = (i: number) =>
  `cresco-publication-${i}`;

export const crescoPublicationExamplesFactory = (qty: number) => {
  const crescoPublicationExampleRecords =
    [] as CrescoPublicationMongooseRecord[];
  for (let i = 0; i < qty; i++) {
    const id = crescoPublicationExampleGetId(i);
    const example = new CrescoPublicationMongooseRecord();
    example.id = id;
    example.title = 'Publication selling title';
    example.createdAt = randomDates(1, 0, true).start;
    example.text = randomTextDomain();
    const imageUrl = `https://loremflickr.com/1024/768/${randPos([
      'crypto',
      'bank',
      'currency',
      'bitcoin',
      'blockchain',
      'ethereum',
      'coin',
      'money',
      'trends',
    ])}`;
    example.imageUrl = [
      {
        url: imageUrl,
        name: '1.png',
      },
    ];
    crescoPublicationExampleRecords.push(example);
  }
  return crescoPublicationExampleRecords;
};
