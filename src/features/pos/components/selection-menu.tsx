import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function SelectionMenu
({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <Card className={cn([
      "grid gap-4 h-full max-h-full p-4 rounded-3xl",
      className
    ])}>
      {children}
    </Card>
  );
}