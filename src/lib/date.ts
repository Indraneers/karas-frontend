export function convertDateToLocaleDate(date: Date) {
  return date.toISOString().slice(0, -1);
}