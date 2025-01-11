import { IconInput } from "@/components/ui/icon-input";
import { Search } from "lucide-react";
import { FormEvent } from "react";

interface UnitSearchProps {
  value: string;
  className?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function UnitSearch({ className, value, onChange = console.log, onFocus, onBlur }: UnitSearchProps) {
  function handleOnInput(event: FormEvent<HTMLInputElement>) {
    const inputText = event.currentTarget.value;
    onChange(inputText);
  }
  return (
    <IconInput 
      className={className}
      value={value}
      onInput={handleOnInput}
      icon={Search} 
      iconProps={{ behavior: 'prepend' }}  
      placeholder="Search Units" 
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}