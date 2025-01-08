import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { cn } from "@/lib/utils";
import { ItemCartInput } from "./item-cart-input";
import { useState } from "react";
import { isValidVariableQty } from "@/lib/variable";

interface CounterProps {
  className?: string;
  variable?: boolean;
  baseUnit?: string;
  value: number;
  setValue: (v: string) => void;
}

export function ItemCounter({ variable = false, baseUnit, className, value, setValue }: CounterProps) {
  const [quantity, setQuantity] = useState<string>(String(value));

  function handleInput(event: React.FormEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;
    if (isValidVariableQty(value)) {
      setQuantity(value);
      setValue(value);
    }
  }

  function updateValue(value: number) {
    const formattedValue = String(value);
    console.log(isValidVariableQty(formattedValue));
    if (isValidVariableQty(formattedValue)) {
      setQuantity(formattedValue);
      setValue(formattedValue);
    }
  }

  return (
    <div className={cn([
      "gap-2 items-center justify-end flex",
      className
    ])}>
      <Button onClick={() => updateValue(Number(quantity) - 1)} className="w-5 h-5" size="icon">
        <ChevronLeft />
      </Button>
      <ItemCartInput className={cn([
        "w-10 min-w-10"
      ])} suffix={variable ? (baseUnit || '') : ''} value={quantity} onInput={handleInput} />
      <Button onClick={() => updateValue(Number(quantity) + 1)} className="w-5 h-5" size="icon">
        <ChevronRight />
      </Button>
    </div>
  );
}