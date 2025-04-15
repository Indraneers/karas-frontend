import { convertRawCurrencyToDisplayCurrency } from "@/features/currency/utils/currency";

// assume we want xxxx to xx.xx
export function Currency({ amount } : { amount: number }) {
  return <>$ {convertRawCurrencyToDisplayCurrency(amount)}</>;
}