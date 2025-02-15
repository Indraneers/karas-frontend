import { cn } from "@/lib/utils";

export function ProductIdentifier({ identifier, className } : { identifier?: string, className?: string }) {
  return (
    <div className={cn([
      'hidden',
      identifier && 'inline-block',
      className
    ])}>
      ({identifier})
    </div>
  );
}