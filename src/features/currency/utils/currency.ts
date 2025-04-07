// we assume it's from xxxx to xx.xx
export function convertRawCurrencyToCurrencyString(currency: number) {
  return currency === undefined ? '' : String(currency / 100);
}

// we assume it's from xxxx to xx.xx
export function convertRawCurrencyToDisplayCurrency(currency: number) {
  return currency === undefined ? '' : (currency / 100).toFixed(2);
}

export function convertCurrencyStringToRawCurrency(currencyString: string) {
  return Number((Number(currencyString) * 100).toFixed(2));
}