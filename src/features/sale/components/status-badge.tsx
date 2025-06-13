import { Badge } from "@/components/ui/badge";
import { StatusEnum } from "../types/sale";
import { cn } from "@/lib/utils";
import { Check, Clock4 } from "lucide-react";

export function StatusBadge({ status, className }: { status: StatusEnum, className?: string }) {
  return (
    <>
      {status === "PAID" && 
    <Badge variant='info-dark-green' className={cn(
      className
    )}>
      <Check className="mr-1 w-3 h-3" />
      Paid
    </Badge>
      }
      {status === "HOLD" && 
    <Badge 
      variant='info-amber-dark'
      className={cn([
        className
      ])}
    >
      <Clock4 className="mr-1 w-3 h-3" />
      Hold
    </Badge>
      }
    </>
  );
}