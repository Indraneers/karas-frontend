import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ItemCartInput } from "../features/cart/components/item-cart-input";
import { useEffect, useState } from "react";
import { isValidVariableQty } from "@/lib/variable";
import { convertBaseQuantityToDisplayQuantity, convertBaseQuantityToQuantity, convertBaseQuantityToRawQuantity, convertQuantityToBaseQuantity } from "@/features/unit/util/convert";

interface CounterProps {
  className?: string;
  variable?: boolean;
  baseUnit?: string;
  value: number;
  toBaseUnit: number;
  setValue: (v: number) => void;
}

export function ItemCounter({ variable = false, toBaseUnit, baseUnit, className, value, setValue }: CounterProps) {
  const [displayQuantity, setDisplayQuantity] = useState<string>();

  function handleInput(event: React.FormEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;
    if (isValidVariableQty(value)) {
      const quantity = variable ? convertBaseQuantityToRawQuantity(Number(value)) : convertQuantityToBaseQuantity(toBaseUnit, Number(value));
      console.log(quantity);
      setValue(quantity);
    }
  }

  function updateValue(value: number) {
    const formattedValue = String(value);
    if (isValidVariableQty(formattedValue)) {
      const quantity = variable ? Number(value) : convertQuantityToBaseQuantity(toBaseUnit, Number(value));
      setValue(quantity);
    }
  }

  useEffect(() => {
    if (variable) {
      setDisplayQuantity(String(convertBaseQuantityToDisplayQuantity(Number(value))));
    }
    else {
      setDisplayQuantity(String(convertBaseQuantityToQuantity(toBaseUnit, value)));
    }
  }, [value, variable, toBaseUnit]);

  return (
    <div className={cn([
      "gap-2 items-center grid grid-cols-[auto,1fr,auto]",
      className
    ])}>
      <Button 
        variant='ghost' 
        onClick={() => updateValue(Number(displayQuantity) - 1)} 
        className="w-6 xl:w-5 h-6 xl:h-5" 
        size="icon"
      >
        <Minus />
      </Button>
      <ItemCartInput 
        className={cn([
          "w-full h-full"
        ])} suffix={variable ? (baseUnit || '') : 'Qty'} value={displayQuantity} onInput={handleInput} />
      <Button 
        variant='ghost' 
        onClick={() => updateValue(Number(displayQuantity) + 1)} 
        className="w-6 xl:w-5 h-6 xl:h-5" 
        size="icon"
      >
        <Plus />
      </Button>
    </div>
  );
}