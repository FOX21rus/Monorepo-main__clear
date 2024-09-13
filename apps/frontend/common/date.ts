export const strToDateStr = (str: any) => {
  if (!str) return "";
  const date = new Date(str);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${day}.${month}.${year}`;
};

export const strToTimeStr = (str: any) => {
  if (!str) return "";
  const date = new Date(str);
  const hours = String(date.getHours());
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}.${minutes}`;
};

export const getAge = (birthDateStr: string) => {
  const age = Math.floor(
    (new Date().valueOf() - new Date(birthDateStr).valueOf()) /
      (1000 * 60 * 60 * 24 * 365)
  ).toString();
  const lastDateChar = parseInt(age[age.length - 1]);
  if ([1].includes(lastDateChar)) return age + " год";
  if ([2, 3, 4].includes(lastDateChar)) return age + " года";
  if ([0, 5, 6, 7, 8, 9].includes(lastDateChar)) return age + " лет";
};
