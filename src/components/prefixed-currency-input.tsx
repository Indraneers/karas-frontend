import { GenericCurrencyInputProps } from "@/features/currency/types/generic-currency-input-props";
import { convertCurrencyStringToRawCurrency, convertRawCurrencyToCurrencyString } from "@/features/currency/utils/currency";
import { toastError } from "@/lib/toast";
import { cn } from "@/lib/utils";
import CurrencyInput from "react-currency-input-field";
import { useEffect, useState } from "react";

export function PrefixedCurrencyInput({
  className,
  value,
  defaultValue,
  onValueChange,
  ...props
}: GenericCurrencyInputProps) {
  const [internalValue, setInternalValue] = useState<string | undefined>(
    convertRawCurrencyToCurrencyString(defaultValue || 0)
  );

  // Sync internal state if the `value` prop changes
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(convertRawCurrencyToCurrencyString(Number(value) || 0));
    }
  }, [value]);

  const handleChange = (val: string | undefined) => {
    setInternalValue(val);

    if (!val) return;

    const raw = convertCurrencyStringToRawCurrency(val);

    if (raw < 0) {
      toastError("Currency can't be negative");
      return;
    }

    if (onValueChange) {
      onValueChange(raw);
    }
  };

  return (
    <div
      className={cn([
        "flex items-center gap-2 border-border bg-white p-1 border rounded-md w-16 h-6",
        className
      ])}
    >
      <span className="text-foreground/50">$</span>
      <CurrencyInput
        {...props}
        value={internalValue}
        onValueChange={handleChange}
        allowDecimals
        allowNegativeValue={false}
        disableGroupSeparators
        className="flex bg-transparent focus:outline-none w-full"
      />
    </div>
  );
}
