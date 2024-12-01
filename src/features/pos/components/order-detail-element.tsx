import { cn } from "@/lib/utils";

interface OrderDetailElementProps {
  className?: string;
  children: React.ReactNode;
  label: React.ReactNode;
}

export function OrderDetailElement({ className, label, children } : OrderDetailElementProps) {
  return (
    <div className={cn([
      'grid grid-cols-2 text-sm items-center',
      className
    ])}>
      <span className="items-start text-foreground/50">{label}</span>
      <div className="items-end">
        {children}
      </div>
    </div>
  );
}