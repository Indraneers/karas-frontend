import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { cn } from "@/lib/utils";
import { ItemCardInput } from "@/features/pos/components/item-card-input";

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
      "flex gap-2 items-center",
      className
    ])}>
      <Button onClick={() => setValue(String(intValue - 1))} className="w-5 h-5" size="icon">
        <ChevronLeft />
      </Button>
      <ItemCardInput value={value} onInput={handleInput} />
      <Button onClick={() => setValue(String(intValue + 1))} className="w-5 h-5" size="icon">
        <ChevronRight />
      </Button>
    </div>
  );
}