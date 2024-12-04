import { IconInput } from "@/components/ui/icon-input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { FormEvent } from "react";

interface VehicleCustomerSearchProps {
  className?: string;
  value?: string;
  onChange?: (inputText: string) => void;
}

export function VehicleCustomerSearch({ className, value, onChange = console.log } : VehicleCustomerSearchProps) {
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
        className="border-2 border-muted-foreground rounded-full focus-within:ring-muted-foreground font-medium text-md"
        value={value}
        onInput={handleOnInput}
        icon={Search} 
        iconProps={{ behavior: 'prepend', className: 'text-muted-foreground' }} 
        placeholder="Search Vehicle or Customer" />
    </div>
  );
}