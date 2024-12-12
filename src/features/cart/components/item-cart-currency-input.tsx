import * as React from "react";

import { cn } from "@/lib/utils";
import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";

interface ItemCartCurrencyInputProps extends CurrencyInputProps {
  prefix?: string;
}

const ItemCartCurrencyInput = React.forwardRef<HTMLInputElement, ItemCartCurrencyInputProps>(
  ({ className, type, prefix, ...props }, ref) => {
    return (
      <div className={cn([
        "flex items-center bg-gray-200 px-1 rounded-full",
        className
      ])}>
        <span className="text-xs">{prefix}</span>
        <CurrencyInput
          className={cn([
            'flex w-full',
            "border-0 bg-transparent h-5 p-0 m-0 text-xs text-center focus:outline-none" 
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
ItemCartCurrencyInput.displayName = "Input";

export {
  ItemCartCurrencyInput
};