export function isMoreThanTwoDigit(t: string) {
  const textArray = t.split('.');
  if (textArray[1] != null) {
    return textArray[1].length > 2;
  }
  return false;
}

export function isValidCurrencyInput(t: string) {
  const validPattern = /^(\d+(\.\d{1,2})?|\d+\.|)$/;
  return validPattern.test(t);
}