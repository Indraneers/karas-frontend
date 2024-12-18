import { toastError } from "@/lib/toast";
import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";

export function PrefixedCurrencyInput({ onValueChange, ...props }: CurrencyInputProps) {
  return (
    <div className="flex items-center gap-2 border-foreground bg-white p-1 border rounded-md w-16 h-6">
      <span className="text-foreground/50">$</span>
      <CurrencyInput 
        onValueChange={(value) => {
          if (Number(value) < 0) {
            toastError('Currency can\'t be negative');
            return;
          }
          
          if (onValueChange) {
            onValueChange(value);
          }
        }}
        className="flex bg-transparent w-full focus:outline-none" 
        {...props} />
    </div>
  );
}