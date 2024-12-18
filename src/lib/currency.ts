// we assume it's from xxxx to xx.xx
export function convertCurrencyToInputString(currency: number) {
  return currency !== 0 ? (currency/100).toFixed(2) : '';
}

export function convertCurrencyToString(currency: number) {
  return (currency/100).toFixed(2);
}

export function convertStringToCurrency(currencyString: string) {
  return Number((Number(currencyString) * 100).toFixed(2));
}