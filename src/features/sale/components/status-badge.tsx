import { Badge } from "@/components/ui/badge";
import { StatusEnum } from "../types/sale";
import { cn } from "@/lib/utils";

export function StatusBadge({ status, className }: { status: StatusEnum, className?: string }) {
  return (
    <>
      {status === "PAID" && 
    <Badge className={cn(
      "bg-emerald-500 hover:bg-emerald-600",
      className
    )}>
      Paid
    </Badge>
      }
      {status === "HOLD" && 
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