import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

export function RestockItemStatusButton
({ className, onClick, selected, children }: { className?: string, onClick: React.MouseEventHandler<HTMLButtonElement>, selected: boolean, children: React.ReactNode}) {
  return (
    <Button 
      onClick={onClick}
      variant='outline'
      className={cn([
        'border-border shadow-none font-semibold hover:bg-transparent hover:text-foreground',
        className,
        selected && 'border-primary border-[2px]'
      ])}
    >
      {children}
    </Button>
  );
}