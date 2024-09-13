export const filterIndex = (arr: any[], cb: any) => {
  return arr
    .map((o, i) => [o, i])
    .filter(([o]) => cb(o))
    .map(([, i]) => i);
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const camelToSnakeCase = (str) =>
  str
    .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
    .replace("_", "");

export const camelToDashCase = (str) => {
  let newStr = str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
  if (newStr[0] === "-") newStr = newStr.replace("-", "");
  return newStr;
};

export const upperCamelToLowerCamel = (str) =>
  str
    .split("")
    .map((s, i) => (i === 0 ? s.toLowerCase() : s))
    .join("");

// такаяСтрока => ТакаяСтрока
export const lowerCamelToUpperCamel = (str) => capitalizeFirstLetter(str);

export function fillDefined(obj: Record<string, any>) {
  return Object.entries(obj).reduce((obj: any, cur) => {
    if (typeof cur[1] !== "undefined" && cur[0] !== "undefined")
      obj[cur[0]] = cur[1];

    return obj;
  }, {});
}

export function fillDefinedAndNotNull(obj: Record<string, any>) {
  return Object.entries(obj).reduce((obj: any, cur) => {
    if (
      typeof cur[1] !== "undefined" &&
      cur[0] !== "undefined" &&
      cur[1] !== null
    )
      obj[cur[0]] = cur[1];

    return obj;
  }, {});
}

export const stripMeta = (object: Record<string, any>) => {
  let o = { ...object };
  delete o?.__meta;
  return o;
};

export const arrayUniqueByKey = (array: any[], key: string) => [
  // @ts-ignore
  ...new Map(array.map((item) => [item[key], item])).values(),
];
