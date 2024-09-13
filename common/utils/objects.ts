export function fillDefined(obj: Record<string, any>) {
  return Object.entries(obj).reduce((obj: any, cur) => {
    if (typeof cur[1] !== 'undefined' && cur[0] !== 'undefined')
      obj[cur[0]] = cur[1];

    return obj;
  }, {});
}

export const stripMeta = (object: Record<string, any>) => {
  const o = { ...object };
  delete o?.__meta;
  return o;
};
