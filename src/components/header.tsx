import { cn } from "@/lib/utils";
import React from "react";

export function Header({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex h-12 shrink-0 items-center gap-2 px-4 lg:px-6",
        className
      )}
    >
      {children}
    </header>
  );
}