import { randIntStr, randPos } from './rand-int';

export const randomPhone = () => {
  return (
    '7' +
    randPos(['901', '905', '906', '916', '926', '977', '999']) +
    randIntStr(7)
  );
};
