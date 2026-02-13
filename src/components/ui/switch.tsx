"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default";
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "group/switch peer inline-flex after:absolute relative after:-inset-x-3 after:-inset-y-2 items-center data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:opacity-50 border border-transparent aria-invalid:border-destructive focus-visible:border-ring dark:aria-invalid:border-destructive/50 rounded-full outline-none aria-invalid:ring-3 aria-invalid:ring-destructive/20 focus-visible:ring-3 focus-visible:ring-ring/50 dark:aria-invalid:ring-destructive/40 data-[size=default]:w-[32px] data-[size=sm]:w-[24px] data-[size=default]:h-[18.4px] data-[size=sm]:h-[14px] transition-all data-disabled:cursor-not-allowed shrink-0",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="block bg-background dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground rounded-full ring-0 group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 transition-transform group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-unchecked:translate-x-0 pointer-events-none"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
