import { Badge } from "@/components/ui/badge";
import { StatusEnum } from "../types/sale";
import { cn } from "@/lib/utils";
import { Check, Clock4 } from "lucide-react";

export function StatusBadge({ status, className }: { status: StatusEnum, className?: string }) {
  return (
    <>
      {status === "PAID" && (
        <Badge className={cn(
          "bg-emerald-600 text-white border-transparent rounded-md font-medium text-[11px] gap-1 px-2 py-0.5",
          className
        )}>
          <Check className="size-3" strokeWidth={2.5} />
          Paid
        </Badge>
      )}
      {status === "HOLD" && (
        <Badge className={cn(
          "bg-amber-500 text-white border-transparent rounded-md font-medium text-[11px] gap-1 px-2 py-0.5",
          className
        )}>
          <Clock4 className="size-3" strokeWidth={2.5} />
          Hold
        </Badge>
      )}
    </>
  );
}