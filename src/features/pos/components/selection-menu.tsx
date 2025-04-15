import { cn } from "@/lib/utils";

export function SelectionMenu
({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn([
      "grid gap-4 h-full max-h-full",
      className
    ])}>
      {children}
    </div>
  );
}