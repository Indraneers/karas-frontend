import { Badge } from "@/components/ui/badge";
import { PaymentType } from "../types/sale";
import { cn } from "@/lib/utils";
import { Banknote, CreditCard } from "lucide-react";

export function PaymentTypeBadge({ paymentType, className }: { paymentType: PaymentType, className?: string }) {
  return (
    <>
      {paymentType === "BANK" && (
        <Badge className={cn(
          "bg-sky-600 text-white border-transparent rounded-md font-medium text-[11px] gap-1 px-2 py-0.5",
          className
        )}>
          <CreditCard className="size-3" strokeWidth={2.5} />
          Bank
        </Badge>
      )}
      {paymentType === "CASH" && (
        <Badge className={cn(
          "bg-emerald-600 text-white border-transparent rounded-md font-medium text-[11px] gap-1 px-2 py-0.5",
          className
        )}>
          <Banknote className="size-3" strokeWidth={2.5} />
          Cash
        </Badge>
      )}
    </>
  );
}