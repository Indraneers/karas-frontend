import { GenericCurrencyInputProps } from "@/features/currency/types/generic-currency-input-props";
import { convertCurrencyStringToRawCurrency, convertRawCurrencyToCurrencyString } from "@/features/currency/utils/currency";
import { toastError } from "@/lib/toast";
import { cn } from "@/lib/utils";
import CurrencyInput from "react-currency-input-field";

export function PrefixedCurrencyInput({ className, defaultValue, onValueChange, ...props }: GenericCurrencyInputProps) {
  const sanitizedDefaultValue = convertRawCurrencyToCurrencyString(defaultValue || 0);
  return (
    <div className={cn([
      "flex items-center gap-2 border-foreground bg-white p-1 border rounded-md w-16 h-6",
      className
    ])}>
      <span className="text-foreground/50">$</span>
      <CurrencyInput 
        {...props} 
        defaultValue={sanitizedDefaultValue}
        onValueChange={(value) => {
          if (Number(value) < 0) {
            toastError('Currency can\'t be negative');
            return;
          }
          
          if (onValueChange && value) {
            onValueChange(convertCurrencyStringToRawCurrency(value));
          }
        }}
        className="flex bg-transparent focus:outline-none w-full" 
      />
    </div>
  );
}