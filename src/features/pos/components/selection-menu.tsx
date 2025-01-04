import { cn } from "@/lib/utils";

export function SelectionMenu
({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn([
      "grid grid-rows-[4fr,auto,2fr] gap-4 h-full max-h-full",
      className
    ])}>
      {children}
    </div>
  );
}