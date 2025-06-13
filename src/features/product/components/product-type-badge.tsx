import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Box, Boxes } from "lucide-react";

export function ProductTypeBadge({ className, variable } : { className?: string, variable: boolean }) {
  return (
    variable ?
      <Badge variant='info-orange' className={cn(className)} >
        <Boxes className="mr-1 w-3 h-3" />
        Variable
      </Badge>
      :
      <Badge variant='info-green' className={cn(className)} >
        <Box className="mr-1 w-3 h-3" />
        Countable
      </Badge>
  );
}