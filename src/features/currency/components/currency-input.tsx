import { ChangeEventHandler } from "react";
import { Input } from "../../../components/ui/input";

interface CurrencyInputProps {
  value: number | string | undefined;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export function CurrencyInput({ value, onChange }: CurrencyInputProps) {
  return (
    <div className="relative">
      <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
        <span className="text-muted-foreground">$</span>
      </div>
      <Input value={value} onChange={onChange} id="currency" type="number" min={-100000} max={100000} step={0.01} placeholder="0.00" className="pl-9" />
    </div>
  );
}