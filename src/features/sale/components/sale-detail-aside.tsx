import { cn } from "@/lib/utils";

export function SaleDetailAside
({ className, children }: { className?: string, children: React.ReactNode}) {
  return (
    <div className={cn([
      'rounded-xl p-4 bg-card h-full border',
      className
    ])}>
      {children}
    </div>
  );
}