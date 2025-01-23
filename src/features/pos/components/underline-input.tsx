import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "../../../components/ui/input";

const UnderlineInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <Input
        className={cn([
          'border-0 outline-none focus-visible:ring-0 bg-transparent !text-lg',
          'shadow-none p-0 rounded-none border-b h-6 border-background',
          '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none',
          '[&::-webkit-inner-spin-button]:appearance-none',
          className
        ])}
        type={type}
        ref={ref}
        {...props}
      />
    );
  }
);
UnderlineInput.displayName = "Input";

export {
  UnderlineInput
};