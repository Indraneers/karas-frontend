import { IconInput } from "@/components/ui/icon-input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { FormEvent } from "react";

interface VehicleSearchProps {
  className?: string;
  value?: string;
  onChange?: (inputText: string) => void;
}

export function VehicleSearch({ className, value, onChange = console.log } : VehicleSearchProps) {
  function handleOnInput(event: FormEvent<HTMLInputElement>) {
    const inputText = event.currentTarget.value;
    onChange(inputText);
  }
  return (
    <IconInput
      value={value}
      onInput={handleOnInput}
      className={cn([
        'h-6 text-xs',
        className
      ])}
      icon={Search} 
      iconProps={{ behavior: 'prepend' }}  
      placeholder="Search Vehicle" />
  );
}