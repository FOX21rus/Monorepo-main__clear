import { UserMongooseRecord } from '../mongoose/user.mongoose.record';
import { randomName } from '../../../_common/randomizers/random-names';
import { randPos } from '../../../_common/randomizers/rand-int';

export const userExampleGetId = (i: number) => `user-${i}`;
export const userExampleGetEmail = (i: number) => `user-${i}@domain.com`;
export const userExampleGetEmailUri = (i: number) =>
  `email://${userExampleGetEmail(i)}`;

export const userExamplesFactory = (qty: number) => {
  const userExampleRecords = [] as UserMongooseRecord[];
  for (let i = 0; i < qty; i++) {
    const id = userExampleGetId(i);
    const example = new UserMongooseRecord();
    // example._id = id;
    example.phone = `79000000${String(i).padStart(3, '0')}`;
    example.email = userExampleGetEmail(i);
    example.displayName = randomName().fio;
    if (i === 0) example.roles = ['super_admin', 'customer'];
    else
      example.roles = [
        randPos([
          'customer',
          'customer',
          'customer',
          'customer',
          'customer',
          'admin',
          'admin',
          'super_admin',
          'dismissed',
          'dismissed',
        ]),
      ];

    userExampleRecords.push(example);
  }
  return userExampleRecords;
};
