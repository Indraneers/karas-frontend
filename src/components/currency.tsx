import { convertCurrencyToString } from "@/lib/currency";

// assume we want xxxx to xx.xx
export function Currency({ amount } : { amount: number }) {
  return <>$ {convertCurrencyToString(amount)}</>;
}