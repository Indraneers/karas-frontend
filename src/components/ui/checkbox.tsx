import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "peer data-[state=checked]:bg-primary disabled:opacity-50 shadow border border-border rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-4 h-4 data-[state=checked]:text-primary-foreground disabled:cursor-not-allowed shrink-0",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex justify-center items-center text-current")}
      >
        <Check className="w-4 h-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
