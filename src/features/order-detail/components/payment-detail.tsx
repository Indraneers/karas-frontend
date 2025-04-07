import { TypographyH3 } from "@/components/ui/typography/h3";
import { WalletCards } from "lucide-react";
import { PaymentDetailElement } from "./payment-detail-element";
import { Separator } from "@/components/ui/separator";
import { usePosStore } from "@/features/pos/store/pos";
import { PrefixedCurrencyInput } from "@/components/prefixed-currency-input";
import { getSubtotal } from "@/features/sale/utils/sale";
// import { getCheckedServiceItem } from "@/features/service-selector/utils/service-selector";
import { Currency } from "@/components/currency";
import { cn } from "@/lib/utils";

export function PaymentDetail({ children, className } : { children: React.ReactNode, className?: string }) {
  const { items, maintenance, discount, setDiscount } = usePosStore();
  const { services } = maintenance;

  const subTotal= getSubtotal({ items, maintenanceServices: services  });
  const total = subTotal - discount;

  return (
    <div className={cn([
      className
    ])}>
      <div>
        <TypographyH3 className="flex items-center gap-2">
          <WalletCards />
            Payment Details
        </TypographyH3>

        <div className="mt-2">
          <PaymentDetailElement className="mt-4" label="Sub Total">
            <Currency amount={subTotal} />
          </PaymentDetailElement>
          <PaymentDetailElement className="mt-1" label="Discount">
            <PrefixedCurrencyInput 
              defaultValue={discount}
              onValueChange={(value) => {
                setDiscount(value);
              }}
            />
          </PaymentDetailElement>
          <Separator className="mt-2" />
          <PaymentDetailElement className="mt-2" label="Total">
            <Currency amount={total} />
          </PaymentDetailElement>
        </div>
        
      </div>

      <div className="mt-2">
        {children}
      </div>
    </div>
  );
}