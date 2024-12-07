import * as React from "react";

import { cn } from "@/lib/utils";
import { PrimitiveCurrencyInput } from "@/features/currency/components/primitive-currency-input";

interface ItemCardCurrencyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handleInput: (value: string) => void
}

const ItemCardCurrencyInput = React.forwardRef<HTMLInputElement, ItemCardCurrencyInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <PrimitiveCurrencyInput
        className={cn([
          "border-0 bg-background px-0 rounded-full h-5 text-center" ,
          className
        ])}
        type={type}
        ref={ref}
        {...props}
      />
    );
  }
);
ItemCardCurrencyInput.displayName = "Input";

export {
  ItemCardCurrencyInput
};