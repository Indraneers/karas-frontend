import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { cn } from "@/lib/utils";
import { ItemCartInput } from "./item-cart-input";

interface CounterProps {
  className?: string;
  value: string;
  setValue: (v: string) => void;
}

export function ItemCounter({ className, value, setValue }: CounterProps) {
  function handleInput(event: React.FormEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;
    const intValue = parseInt(value) || 0;
    setValue(intValue.toString());
  }

  const intValue = parseInt(value);

  return (
    <div className={cn([
      "gap-2 items-center justify-end flex",
      className
    ])}>
      <Button onClick={() => setValue(String(intValue - 1))} className="w-5 h-5" size="icon">
        <ChevronLeft />
      </Button>
      <ItemCartInput className="w-10 min-w-10" value={value} onInput={handleInput} />
      <Button onClick={() => setValue(String(intValue + 1))} className="w-5 h-5" size="icon">
        <ChevronRight />
      </Button>
    </div>
  );
}