import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";

export function PrefixedCurrencyInput({ ...props }: CurrencyInputProps) {
  return (
    <div className="flex items-center gap-2 border-foreground bg-white p-1 border rounded-md w-full">
      <span className="text-foreground/50">$</span>
      <CurrencyInput 
        className="bg-transparent focus:outline-none flex w-full" 
        {...props} />
    </div>
  );
}