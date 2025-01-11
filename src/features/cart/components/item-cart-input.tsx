import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface ItemCartInputProps extends React.ComponentProps<"input"> {
  suffix?: string;
}

const ItemCartInput = React.forwardRef<HTMLInputElement, ItemCartInputProps>(
  ({ className, type, suffix, ...props }, ref) => {
    return (
      <div className="flex items-center bg-gray-200/75 rounded-sm h-full overflow-hidden">
        <Input
          className={cn([
            "border-0 px-1 h-5 text-center bg-transparent shadow-none rounded-none focus-visible:ring-0" ,
            className
          ])}
          type={type}
          ref={ref}
          {...props}
        />
        <div className={cn([
          "hidden  items-center px-1 bg-gray-200 z-10",
          suffix && 'flex'
        ])}>
          {suffix}
        </div>
      </div>
    );
  }
);
ItemCartInput.displayName = "Input";

export {
  ItemCartInput
};