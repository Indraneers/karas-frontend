import { IconInput } from "@/components/ui/icon-input";
import { Search } from "lucide-react";
import { FormEvent } from "react";

interface CustomerSearchProps {
  className?: string;
  value?: string;
  onChange?: (inputText: string) => void;
}

export function CustomerSearch({ value, className, onChange = console.log } : CustomerSearchProps) {
  function handleOnInput(event: FormEvent<HTMLInputElement>) {
    const inputText = event.currentTarget.value;
    onChange(inputText);
  }
  return (
    <IconInput 
      value={value}
      onInput={handleOnInput}
      className={className}
      icon={Search} 
      iconProps={{ behavior: 'prepend' }}  
      placeholder="Search Customer" 
    />
  );
}