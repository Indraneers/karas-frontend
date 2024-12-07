import * as React from "react";

import { cn } from "@/lib/utils";
import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";

const ItemCardCurrencyInput = React.forwardRef<HTMLInputElement,CurrencyInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <CurrencyInput
        prefix="$"
        className={cn([
          'flex w-full',
          "border-0 bg-background px-0 rounded-full h-5 text-center" ,
          className
        ])}
        type={type}
        ref={ref}
        disableGroupSeparators
        {...props}
      />
    );
  }
);
ItemCardCurrencyInput.displayName = "Input";

export {
  ItemCardCurrencyInput
};