import * as React from "react";

import { cn } from "@/lib/utils";
import { PrimitiveCurrencyInput } from "./primitive-currency-input";

interface UnderlineCurrencyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handleInput: (value: string) => void
}

const UnderlineCurrencyInput = React.forwardRef<HTMLInputElement, UnderlineCurrencyInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <PrimitiveCurrencyInput
        className={cn([
          'border-0 outline-none focus-visible:ring-0 bg-transparent !text-lg',
          'shadow-none p-0 rounded-none border-b h-6 border-background',
          '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none',
          '[&::-webkit-inner-spin-button]:appearance-none',
          className
        ])}
        type={type}
        ref={ref}
        {...props}
      />
    );
  }
);
UnderlineCurrencyInput.displayName = "Input";

export {
  UnderlineCurrencyInput
};