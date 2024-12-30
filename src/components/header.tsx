import { cn } from "@/lib/utils";
import React from "react";

export function Header
({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <header className={cn([
      "sticky top-0 bg-background flex gap-2 border-b h-16 shrink-0 items-center px-8",
      className
    ])}>
      {children}
    </header>
  );
}