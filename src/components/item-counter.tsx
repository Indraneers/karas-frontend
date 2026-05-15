import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ItemCartInput } from "../features/cart/components/item-cart-input";
import { useEffect, useState } from "react";
import { isValidVariableQty } from "@/lib/variable";
import {
  convertBaseQuantityToDisplayQuantity,
  convertBaseQuantityToQuantity,
  convertDiscreteQuantityToVariableQuantity,
  convertDisplayQuantityToVariableQuantity,
} from "@/features/unit/util/convert";

interface CounterProps {
  className?: string;
  variable?: boolean;
  baseUnit?: string;
  value: number;
  toBaseUnit: number;
  setValue: (v: number) => void;
}

export function ItemCounter({
  variable = false,
  toBaseUnit,
  baseUnit,
  className,
  value,
  setValue,
}: CounterProps) {
  const [displayQuantity, setDisplayQuantity] = useState<string>();

  function handleInput(event: React.FormEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;
    if (isValidVariableQty(value)) {
      const quantity = variable
        ? convertDisplayQuantityToVariableQuantity(value)
        : convertDiscreteQuantityToVariableQuantity(Number(value), toBaseUnit);
      setValue(quantity);
      setDisplayQuantity(value);
    }
  }

  function updateValue(value: number) {
    const formattedValue = String(value);
    if (isValidVariableQty(formattedValue)) {
      const quantity = variable
        ? convertDisplayQuantityToVariableQuantity(value)
        : convertDiscreteQuantityToVariableQuantity(Number(value), toBaseUnit);
      setValue(quantity);
    }
  }

  useEffect(() => {
    if (variable) {
      setDisplayQuantity(
        String(convertBaseQuantityToDisplayQuantity(Number(value))),
      );
    } else {
      setDisplayQuantity(
        String(convertBaseQuantityToQuantity(toBaseUnit, value)),
      );
    }
  }, [value, variable, toBaseUnit]);

  return (
    <div
      className={cn(
        "items-center grid grid-cols-[auto_1fr_auto] h-7",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => updateValue(Number(displayQuantity) - 1)}
        aria-label="Decrease"
        className="flex items-center justify-center w-6 h-6 rounded text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05]"
      >
        <Minus className="size-3.5" strokeWidth={2} />
      </button>
      <ItemCartInput
        className="w-full h-full"
        suffix={variable ? baseUnit || "" : "Qty"}
        value={displayQuantity}
        onInput={handleInput}
      />
      <button
        type="button"
        onClick={() => updateValue(Number(displayQuantity) + 1)}
        aria-label="Increase"
        className="flex items-center justify-center w-6 h-6 rounded text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05]"
      >
        <Plus className="size-3.5" strokeWidth={2} />
      </button>
    </div>
  );
}
