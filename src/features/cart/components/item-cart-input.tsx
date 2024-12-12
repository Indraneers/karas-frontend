import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const ItemCartInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <Input
        className={cn([
          "border-0 bg-gray-200 px-0 rounded-full h-5 text-center" ,
          className
        ])}
        type={type}
        ref={ref}
        {...props}
      />
    );
  }
);
ItemCartInput.displayName = "Input";

export {
  ItemCartInput
};