import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface ItemCartInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: string;
}
const ItemCartInput = React.forwardRef<HTMLInputElement, ItemCartInputProps>(
  ({ className, type, suffix = "QTY", ...props }, ref) => {
    return (
      <div className="flex items-center h-full">
        <Input
          ref={ref}
          type={type}
          className={cn(
            "bg-transparent shadow-none px-1 border-0 rounded-none focus-visible:ring-0 h-5 text-center text-foreground font-medium tabular-nums",
            className,
          )}
          {...props}
        />
        <span
          className={cn(
            "select-none font-medium text-muted-foreground pr-1",
            suffix.length > 2 ? "text-[10px]" : "text-xs",
          )}
        >
          {suffix}
        </span>
      </div>
    );
  },
);

ItemCartInput.displayName = "ItemCartInput";

export { ItemCartInput };
