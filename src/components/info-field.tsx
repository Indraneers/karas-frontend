import { cn } from "@/lib/utils";

interface InfoFieldProps {
  className?: string;
  label: string;
  children?: React.ReactNode;
}
export function InfoField({ className, label, children } : InfoFieldProps) {
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