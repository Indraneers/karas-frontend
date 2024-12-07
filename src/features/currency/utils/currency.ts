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

export function isAlreadyDecimal(text: string) {
  return text.split('.').length > 1;
}

export function isValidCurrencyValue(t: string) {
  return isValidCurrencyInput(t) && !isMoreThanTwoDigit(t);
}