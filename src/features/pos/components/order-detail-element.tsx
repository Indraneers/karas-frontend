import { cn } from "@/lib/utils";

interface OrderDetailElementProps {
  className?: string;
  children: React.ReactNode;
  label: React.ReactNode;
}

export function OrderDetailElement({ className, label, children } : OrderDetailElementProps) {
  return (
    <div className={cn([
      'grid grid-cols-[1fr,2fr] text-xs items-center',
      className
    ])}>
      <span className="text-foreground/50">{label}</span>
      <div className="justify-self-end font-medium">
        {children}
      </div>
    </div>
  );
}