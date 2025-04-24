import { Badge } from "@/components/ui/badge";
import { PaymentType } from "../types/sale";
import { cn } from "@/lib/utils";

export function PaymentTypeBadge({ paymentType, className }: { paymentType: PaymentType, className?: string }) {
  return (
    <>
      {paymentType === "BANK" && 
    <Badge className={cn(
      "bg-blue-500 hover:bg-blue-600",
      className
    )}>
      BANK
    </Badge>
      }
      {paymentType === "CASH" && 
    <Badge className={cn([
      "bg-green-500 hover:bg-amber-600",
      className
    ])}>
      CASH
    </Badge>
      }
    </>
  );
}