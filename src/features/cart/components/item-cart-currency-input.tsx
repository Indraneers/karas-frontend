import * as React from "react";

import { cn } from "@/lib/utils";
import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";
import { toastError } from "@/lib/toast";

interface ItemCartCurrencyInputProps extends CurrencyInputProps {
  prefix?: string;
}

const ItemCartCurrencyInput = React.forwardRef<HTMLInputElement, ItemCartCurrencyInputProps>(
  ({ className, onValueChange, type, prefix, ...props }, ref) => {
    return (
      <div className={cn([
        "flex items-center bg-gray-200 px-1 rounded-sm",
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
          onValueChange={(value) => {
            if (Number(value) < 0) {
              toastError('Currency can\'t be negative');
              return;
            }
                    
            if (onValueChange) {
              onValueChange(value);
            }
          }}
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