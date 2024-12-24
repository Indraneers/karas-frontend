import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

interface PopoverButtonProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  disabled: boolean;
}

export function PopoverButton({ trigger, children, disabled = false }: PopoverButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open && !disabled} onOpenChange={setOpen}>
      <PopoverTrigger>
        {trigger}
      </PopoverTrigger>
      <PopoverContent  className="relative mr-2 w-[600px] h-[450px]">
        <div className="absolute inset-0 p-4 overflow-scroll">
          {children}
        </div>
      </PopoverContent>
    </Popover>
  );
}