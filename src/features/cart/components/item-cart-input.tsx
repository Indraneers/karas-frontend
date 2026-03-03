import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface ItemCartInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: string;
}
const ItemCartInput = React.forwardRef<HTMLInputElement, ItemCartInputProps>(
  ({ className, type, suffix = "QTY", ...props }, ref) => {
    return (
      <div className="flex items-center bg-gray-200/75 rounded-sm focus-within:ring-1 focus-within:ring-gray-400 h-full overflow-hidden">
        <Input
          ref={ref}
          type={type}
          className={cn(
            "bg-transparent shadow-none px-1 border-0 rounded-none focus-visible:ring-0 h-5 text-center",
            className,
          )}
          {...props}
        />
        <div
          className={cn(
            "flex items-center bg-gray-300 px-2 h-full font-medium text-gray-600 select-none",
            suffix.length > 2 ? "text-[10px]" : "text-xs",
          )}
        >
          {suffix}
        </div>
      </div>
    );
  },
);

ItemCartInput.displayName = "ItemCartInput";

export { ItemCartInput };
