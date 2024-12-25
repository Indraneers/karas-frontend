import { cn } from "@/lib/utils";

interface InvoiceDetailElementProps {
  className?: string;
  label: string;
  children?: React.ReactNode;
}
export function InvoiceDetailElement({ className, label, children } : InvoiceDetailElementProps) {
  return (
    <div className={cn([
      className
    ])}>
      <div className="font-body font-semibold text-[9px] text-muted-foreground">
        {label}
      </div>
      <div className="text-[10px]">
        {children}
      </div>
    </div>
  );
}