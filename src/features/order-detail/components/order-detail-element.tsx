import { cn } from "@/lib/utils";

interface OrderDetailElementProps {
  className?: string;
  children: React.ReactNode;
  label: React.ReactNode;
}

export function OrderDetailElement({ className, label, children } : OrderDetailElementProps) {
  return (
    <div className={cn([
      'flex text-[11px] items-center justify-between',
      className
    ])}>
      <span className="text-foreground/50">{label}</span>
      <div className="font-medium">
        {children}
      </div>
    </div>
  );
}