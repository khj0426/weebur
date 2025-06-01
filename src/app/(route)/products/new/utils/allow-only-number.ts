export function allowOnlyNumber(value: string) {
  return parseInt(value.replace(/[^0-9]/g, ""));
}
