import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ItemCartInput } from "../features/cart/components/item-cart-input";
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
    if (isValidVariableQty(formattedValue)) {
      setQuantity(formattedValue);
      setValue(formattedValue);
    }
  }

  return (
    <div className={cn([
      "gap-2 items-center grid grid-cols-[auto,1fr,auto]",
      className
    ])}>
      <Button 
        variant='ghost' 
        onClick={() => updateValue(Number(quantity) - 1)} 
        className="w-5 h-5" 
        size="icon"
      >
        <Minus />
      </Button>
      <ItemCartInput 
        className={cn([
          "w-full h-full"
        ])} suffix={variable ? (baseUnit || '') : 'Qty'} value={quantity} onInput={handleInput} />
      <Button 
        variant='ghost' 
        onClick={() => updateValue(Number(quantity) + 1)} 
        className="w-5 h-5" 
        size="icon"
      >
        <Plus />
      </Button>
    </div>
  );
}