export const randPos = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

export const randSubsequence = <T>(arr: T[], majorityK: number) =>
  arr.filter((a) => Math.random() < majorityK);

export const randPosTyped = <T>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)] as T;

export const randInt = (fromLen, toLen) =>
  fromLen + Math.round(Math.random() * (toLen - fromLen));

export const randIntStr = (len: number) => {
  let str = '';
  for (let i = 0; i < len; i++) str += String(randInt(0, 9));
  return str;
};
