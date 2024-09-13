export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const withDelta = (str: string) => {
  return str.replace("дельта", "Δ ");
};
