import { CurrencyInputProps } from "react-currency-input-field";

export interface GenericCurrencyInputProps extends Omit<CurrencyInputProps, "onValueChange"> {
  prefix?: string;
  defaultValue?: number;
  onValueChange: (currency: number) => void;
}