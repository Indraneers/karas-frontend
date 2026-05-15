import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
  strokeWidth?: number;
}

/**
 * Geometric, slightly stylized icons tuned for the POS contact medallions.
 * Slightly heavier line weight than default lucide so they read well at
 * tile-sized backgrounds without needing a coloured chip behind them.
 */

export function CustomerIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-4", className)}
      aria-hidden
    >
      <circle cx="12" cy="8" r="3.4" />
      <path d="M4.5 19.5c1.6-3.4 4.5-5 7.5-5s5.9 1.6 7.5 5" />
    </svg>
  );
}

export function VehicleIcon({ className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-4", className)}
      aria-hidden
    >
      {/* Side profile that reads more like a modern sedan */}
      <path d="M3 14h18" />
      <path d="M4 14l2-4.2A2.5 2.5 0 0 1 8.3 8.3h7.4a2.5 2.5 0 0 1 2.3 1.5L20 14" />
      <path d="M3.5 14v2.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V14" />
      <path d="M17.5 14v2.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V14" />
      <circle cx="7" cy="14.5" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="17" cy="14.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
