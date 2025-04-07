import * as React from "react";

import { cn } from "@/lib/utils";
import CurrencyInput from "react-currency-input-field";
import { toastError } from "@/lib/toast";
import { convertCurrencyStringToRawCurrency, convertRawCurrencyToCurrencyString } from "@/features/currency/utils/currency";
import { GenericCurrencyInputProps } from "@/features/currency/types/generic-currency-input-props";

const ItemCartCurrencyInput = React.forwardRef<HTMLInputElement, GenericCurrencyInputProps>(
  ({ className, defaultValue, onValueChange, type, prefix, ...props }, ref) => {
    const sanitizedDefaultValue = convertRawCurrencyToCurrencyString(defaultValue || 0);
    return (
      <div className={cn([
        "flex items-center bg-gray-200/75 px-1 rounded-sm",
        className
      ])}>
        <span className="text-xs">{prefix}</span>
        <CurrencyInput
          className={cn([
            'flex w-full',
            "border-0 bg-transparent h-6 py-1 m-0 text-sm text-center focus:outline-none" 
          ])}
          type={type}
          ref={ref}
          disableGroupSeparators
          onValueChange={(value) => {
            if (Number(value) < 0) {
              toastError('Currency can\'t be negative');
              return;
            }
                    
            if (onValueChange && value) {
              onValueChange(convertCurrencyStringToRawCurrency(value));
            }
          }}
          {...props}
          defaultValue={sanitizedDefaultValue}
        />
      </div>
    );
  }
);
ItemCartCurrencyInput.displayName = "Input";

export {
  ItemCartCurrencyInput
};