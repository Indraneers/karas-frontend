import { cn } from "@/lib/utils";

interface OrderDetailElementProps {
  className?: string;
  children: React.ReactNode;
  label: React.ReactNode;
}

export function OrderDetailElement({ className, label, children } : OrderDetailElementProps) {
  return (
    <div className={cn([
      'grid grid-cols-[1fr,2fr] text-[0.65rem] items-center',
      className
    ])}>
      <span className="text-foreground/60">{label}</span>
      <div className="flex-grow justify-self-end font-medium">
        {children}
      </div>
    </div>
  );
}