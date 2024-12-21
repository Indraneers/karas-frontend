import { toastError } from "@/lib/toast";
import { useState } from "react";
import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";

export function PrefixedCurrencyInput({ defaultValue, onValueChange, ...props }: CurrencyInputProps) {
  const [currString, setCurrString] = useState(defaultValue);

  return (
    <div className="flex items-center gap-2 border-foreground bg-white p-1 border rounded-md w-16 h-6">
      <span className="text-foreground/50">$</span>
      <CurrencyInput 
        {...props} 
        value={currString}
        onValueChange={(value) => {
          if (Number(value) < 0) {
            toastError('Currency can\'t be negative');
            return;
          }
          
          if (onValueChange) {
            setCurrString(value || '');
            onValueChange(value);
          }
        }}
        className="flex bg-transparent w-full focus:outline-none" 
      />
    </div>
  );
}