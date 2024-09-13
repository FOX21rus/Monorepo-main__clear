export const roundHundreds = (num?: number) =>
  num && Math.round(num * 100) / 100;

export const roundDecimals = (num?: number) => num && Math.round(num * 10) / 10;
