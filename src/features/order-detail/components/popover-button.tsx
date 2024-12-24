import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface PopoverButtonProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export function PopoverButton({ trigger, children }: PopoverButtonProps) {
  return (
    <Popover>
      <PopoverTrigger>
        {trigger}
      </PopoverTrigger>
      <PopoverContent className="relative mr-2 w-[600px] h-[450px]">
        <div className="absolute inset-0 p-4 overflow-scroll">
          {children}
        </div>
      </PopoverContent>
    </Popover>
  );
}