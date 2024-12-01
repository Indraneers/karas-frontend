import { IconInput } from "@/components/ui/icon-input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { FormEvent } from "react";

interface CustomerSearchProps {
  className?: string;
  value?: string;
  onChange?: (inputText: string) => void;
}

export function CustomerSearch({ className, value, onChange = console.log } : CustomerSearchProps) {
  function handleOnInput(event: FormEvent<HTMLInputElement>) {
    const inputText = event.currentTarget.value;
    onChange(inputText);
  }
  return (
    <IconInput
      value={value}
      onInput={handleOnInput}
      className={cn([
        'h-8',
        className
      ])}
      icon={Search} 
      iconProps={{ behavior: 'prepend' }}  
      placeholder="Search Customer" />
  );
}