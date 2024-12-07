import { Input } from "@/components/ui/input";
import React, { FormEvent } from "react";
import { isValidCurrencyInput } from "../utils/currency";

interface PrimitiveCurrencyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handleInput: (value: string) => void;
}


const PrimitiveCurrencyInput = React.forwardRef<HTMLInputElement, PrimitiveCurrencyInputProps>(
  ({ className, value, handleInput = console.log, ...props }, ref) => {
    function handleOnChange(event: FormEvent<HTMLInputElement>) {
      const newInput = event.currentTarget.value;
      if (!isValidCurrencyInput(newInput)) {
        handleInput(value);
        return;
      }
      
      handleInput(newInput);
    }

    return (
      <Input
        value={value}
        onChange={handleOnChange}
        className={className}
        type='number'
        ref={ref}
        {...props}
      />
    );
  }
);
PrimitiveCurrencyInput.displayName = "Input";

export {
  PrimitiveCurrencyInput
};