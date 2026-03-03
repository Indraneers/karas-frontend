import * as React from "react";
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';
import { cn } from "@/lib/utils";
import { toastError } from "@/lib/toast";

/**
 * Modernized UnderlineCurrencyInput
 * - Uses forwardRef to resolve "null is not assignable to HTMLInputElement" errors
 * - Prevents negative values with a toast notification
 * - Aligns styles with UnderlineInput for UI consistency
 */
const UnderlineCurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, onValueChange, ...props }, ref) => {
    
    const handleValueChange: CurrencyInputProps['onValueChange'] = (value, name, values) => {
      if (Number(value) < 0) {
        toastError("Currency can't be negative");
        return;
      }

      onValueChange?.(value, name, values);
    };

    return (
      <CurrencyInput
        ref={ref}
        disableGroupSeparators
        onValueChange={handleValueChange}
        className={cn(
          "flex bg-transparent shadow-none p-0 border-0 border-background border-b rounded-none outline-none focus-visible:ring-0 h-6 text-lg!",
          "inline-block [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          className
        )}
        {...props}
      />
    );
  }
);

export { UnderlineCurrencyInput };