import { cn } from "@/lib/utils";

export function ProductIdentifier({ identifier, className } : { identifier?: string, className?: string }) {
  if (!identifier) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-amber-100/70 text-amber-900",
        className
      )}
    >
      {identifier}
    </span>
  );
}