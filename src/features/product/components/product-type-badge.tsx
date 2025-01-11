import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ProductTypeBadge({ className, variable } : { className?: string, variable: boolean }) {
  return (
    <Badge className={cn([
      variable && 'bg-amber-500 hover:bg-amber-600',
      !variable && 'bg-green-500 hover:bg-green-600',
      className
    ])}>
      {
        variable ?
          'VARIABLE'
          :
          'COUNTABLE'
      }
    </Badge>
  );
}