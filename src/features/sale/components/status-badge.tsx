import { Badge } from "@/components/ui/badge";
import { StatusEnum } from "../types/sale";
import { cn } from "@/lib/utils";

export function StatusBadge({ status, className }: { status: StatusEnum, className?: string }) {
  return (
    <>
      {status === "PAID" && 
    <Badge className={cn(
      "bg-green-500 hover:bg-green-600",
      className
    )}>
      Paid
    </Badge>
      }
      {status === "UNPAID" && 
    <Badge className={cn([
      "bg-amber-500 hover:bg-amber-600",
      className
    ])}>
      HOLD
    </Badge>
      }
    </>
  );
}