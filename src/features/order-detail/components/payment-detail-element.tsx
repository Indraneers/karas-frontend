import { cn } from "@/lib/utils";

interface PaymentDetailElementProps {
  className?: string;
  children: React.ReactNode;
  label: React.ReactNode;
}

export function PaymentDetailElement({ className, label, children } : PaymentDetailElementProps) {
  return (
    <div className={cn([
      'flex justify-between w-full text-sm items-center',
      className
    ])}>
      <span className="text-foreground/50">{label}</span>
      <div className="justify-self-end font-medium">
        {children}
      </div>
    </div>
  );
}