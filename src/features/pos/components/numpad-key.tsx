import { cn } from "@/lib/utils";
import { MouseEventHandler } from "react";

interface NumpadKeyProps {
  className?: string;
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>
}

export function NumpadKey({ children, className, onClick }: NumpadKeyProps) {
  return (
    <div 
      onClick={onClick}
      className={cn([
        "place-content-center grid text-foreground aspect-square hover:bg-accent/80 hover:text-background cursor-pointer",
        className
      ])}>
      {children}
    </div>
  );
}