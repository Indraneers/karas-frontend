import * as React from "react";

import { cn } from "@/lib/utils";
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';
import { toastError } from "@/lib/toast";

const UnderlineCurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, onValueChange, ...props }, ref) => {
    return (
      <CurrencyInput
        className={cn([
          'flex',
          'border-0 outline-none focus-visible:ring-0 bg-transparent !text-lg',
          'shadow-none p-0 rounded-none border-b h-6 border-background',
          '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none',
          '[&::-webkit-inner-spin-button]:appearance-none inline-block',
          className
        ])}
        onValueChange={(value) => {
          if (Number(value) < 0) {
            toastError('Currency can\'t be negative');
            return;
          }
                  
          if (onValueChange) {
            onValueChange(value);
          }
        }}
        ref={ref}
        disableGroupSeparators
        {...props}
      />
    );
  }
);
UnderlineCurrencyInput.displayName = "Input";

export {
  UnderlineCurrencyInput
};