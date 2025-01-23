import { cn } from "@/lib/utils";

interface OrderDetailElementProps {
  className?: string;
  children: React.ReactNode;
  label: React.ReactNode;
}

export function OrderDetailElement({ className, label, children } : OrderDetailElementProps) {
  return (
    <div className={cn([
      'flex text-xs items-center justify-between',
      className
    ])}>
      <span className="text-muted-foreground">{label}</span>
      <div className="justify-self-end font-medium">
        {children}
      </div>
    </div>
  );
}