import { Card, CardContent } from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typography/h3";
import { WalletCards } from "lucide-react";
import React from "react";
import { PaymentDetailElement } from "./payment-detail-element";
import { Separator } from "@/components/ui/separator";
import { usePosStore } from "@/features/pos/store/pos";
import { PrefixedCurrencyInput } from "@/components/prefixed-currency-input";
import { getSubtotal } from "@/features/sale/utils/sale";
import { getCheckedServiceItem } from "@/features/service-selector/utils/service-selector";
import { Currency } from "@/components/currency";

export function PaymentDetail({ children } : { children: React.ReactNode}) {
  const { items, services, discount, setDiscount } = usePosStore();

  const checkedServices =  getCheckedServiceItem(services);

  const subTotal = getSubtotal({ items, services: checkedServices });
  const total = subTotal - discount;
  
  return (
    <Card>
      <CardContent>
        <div>
          <TypographyH3 className="flex items-center gap-2 mt-2">
            <WalletCards />
            Payment Details
          </TypographyH3>
          <div className="mt-2" >
            <PaymentDetailElement label="Sub Total">
              <Currency amount={subTotal} />
            </PaymentDetailElement>
            <PaymentDetailElement className="mt-1" label="Discount">
              <PrefixedCurrencyInput 
                defaultValue={discount}
                onValueChange={(value) => setDiscount(Number(value))}
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
      </CardContent>
    </Card>
  );
}