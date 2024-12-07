import * as React from "react";

import { cn } from "@/lib/utils";
import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";

interface ItemCardCurrencyInputProps extends CurrencyInputProps {
  prefix?: string;
}

const ItemCardCurrencyInput = React.forwardRef<HTMLInputElement, ItemCardCurrencyInputProps>(
  ({ className, type, prefix, ...props }, ref) => {
    return (
      <div className="flex items-center bg-background px-1 rounded-full">
        <span className="text-xs">{prefix}</span>
        <CurrencyInput
          className={cn([
            'flex w-full',
            "border-0 bg-transparent h-5 p-0 m-0 text-xs text-center focus:outline-none" ,
            className
          ])}
          type={type}
          ref={ref}
          disableGroupSeparators
          {...props}
        />
      </div>
    );
  }
);
ItemCardCurrencyInput.displayName = "Input";

export {
  ItemCardCurrencyInput
};