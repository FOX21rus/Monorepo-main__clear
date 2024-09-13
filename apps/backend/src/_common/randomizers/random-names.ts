import {
  lastNamesFemale,
  lastNamesMale,
  middleNamesFemale,
  middleNamesMale,
  namesFemale,
  namesMale,
} from './names-rus-dictionary';
import { randPos } from './rand-int';

export const randomName = () => {
  const isFemale = Math.random() > 0.5;
  let name = {} as any;
  if (isFemale) {
    name = {
      firstName: randPos(namesFemale),
      middleName: randPos(middleNamesFemale),
      lastName: randPos(lastNamesFemale),
      isFemale,
    };
  }
  name = {
    firstName: randPos(namesMale),
    middleName: randPos(middleNamesMale),
    lastName: randPos(lastNamesMale),
    isFemale,
  };

  return {
    ...name,
    fio: `${name.lastName} ${name.firstName} ${name.middleName}`,
  };
};
