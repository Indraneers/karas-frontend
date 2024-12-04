import { cn } from "@/lib/utils";

interface OrderDetailElementProps {
  className?: string;
  children: React.ReactNode;
  label: React.ReactNode;
}

export function OrderDetailElement({ className, label, children } : OrderDetailElementProps) {
  return (
    <div className={cn([
      'grid grid-cols-2 text-xs items-center',
      className
    ])}>
      <span className="text-foreground/50">{label}</span>
      <div className="justify-self-end font-semibold">
        {children}
      </div>
    </div>
  );
}