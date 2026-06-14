import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AppMode, getAppMode, getAppModeLabel } from "../utils/app-mode";

export function AppModeBadge({ className }: { className?: string }) {
  const mode = getAppMode();

  return (
    <Badge
      variant="outline"
      className={cn([
        "font-semibold uppercase tracking-wider",
        mode === AppMode.WHOLESALE && 'border-amber-500 text-amber-600',
        mode === AppMode.STORE && 'border-primary text-primary',
        className
      ])}
    >
      {getAppModeLabel()}
    </Badge>
  );
}
