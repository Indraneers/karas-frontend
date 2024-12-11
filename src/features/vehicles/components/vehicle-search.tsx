import { IconInput } from "@/components/ui/icon-input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { FormEvent } from "react";

interface VehicleSearchProps {
  className?: string;
  value?: string;
  onChange?: (inputText: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}

export function VehicleSearch({ className, value, onFocus, onBlur, onChange = console.log } : VehicleSearchProps) {
  function handleOnInput(event: FormEvent<HTMLInputElement>) {
    const inputText = event.currentTarget.value;
    onChange(inputText);
  }

  return (
    <div
      className={cn([
        className
      ])}
    >
      <IconInput
        className="bg-transparent shadow-none border-none rounded-full focus-within:ring-muted-foreground focus-within:ring-0 font-medium text-md"
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onInput={handleOnInput}
        icon={Search} 
        iconProps={{ behavior: 'prepend', className: 'text-muted-foreground' }} 
        placeholder="Search For Vehicle" />
    </div>
  );
}