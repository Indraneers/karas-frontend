import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

/**
 * Modernized UnderlineInput
 * - Uses forwardRef for proper ref handling
 * - Cleaned up className array/object logic
 * - Maintained "no-spinner" styling for number types
 */
const UnderlineInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type={type}
        className={cn(
          "bg-transparent shadow-none p-0 border-0 border-background border-b rounded-none outline-none focus-visible:ring-0 h-6 text-lg!",
          "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          className
        )}
        {...props}
      />
    );
  }
);

export { UnderlineInput };