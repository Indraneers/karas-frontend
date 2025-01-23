import { cn } from "@/lib/utils";

interface SaleDetailElementProps {
  className?: string;
  label: string;
  children?: React.ReactNode;
}
export function SaleDetailElement({ className, label, children } : SaleDetailElementProps) {
  return (
    <div className={cn([
      className
    ])}>
      <div className="text-muted-foreground text-xs">
        {label}
      </div>
      <div className="text-sm">
        {children}
      </div>
    </div>
  );
}