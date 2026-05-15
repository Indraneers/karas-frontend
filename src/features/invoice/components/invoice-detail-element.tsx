import { cn } from "@/lib/utils";

interface InvoiceDetailElementProps {
  className?: string;
  label: string;
  children?: React.ReactNode;
}
export function InvoiceDetailElement({ className, label, children } : InvoiceDetailElementProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <div className="font-body text-[9px] uppercase tracking-[0.12em] text-neutral-500">
        {label}
      </div>
      <div className="mt-0.5 text-[11px] text-neutral-900">{children}</div>
    </div>
  );
}