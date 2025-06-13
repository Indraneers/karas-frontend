import { Badge } from "@/components/ui/badge";
import { PaymentType } from "../types/sale";
import { cn } from "@/lib/utils";
import { Banknote, CreditCard } from "lucide-react";

export function PaymentTypeBadge({ paymentType, className }: { paymentType: PaymentType, className?: string }) {
  return (
    <>
      {paymentType === "BANK" && 
    <Badge variant='info-blue' className={cn(
      className
    )}>
      <CreditCard className="mr-1 w-3 h-3" />
      Bank
    </Badge>
      }
      {paymentType === "CASH" && 
    <Badge 
      variant='info-green'
      className={cn([
        className
      ])}>
      <Banknote className="mr-1 w-3 h-3" />
      Cash
    </Badge>
      }
    </>
  );
}