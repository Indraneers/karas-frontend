import { Card, CardContent } from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typography/h3";
import { WalletCards } from "lucide-react";
import React, { useState } from "react";
import { PaymentDetailElement } from "./payment-detail-element";
import { Separator } from "@/components/ui/separator";
import { usePosStore } from "@/features/pos/store/pos";
import { calculateTotalCost } from "@/features/pos/utils/pos";
import { PrefixedCurrencyInput } from "@/components/prefixed-currency-input";

export function PaymentDetail({ children } : { children: React.ReactNode}) {
  const { items, services } = usePosStore();
  const [discount, setDiscount] = useState('');

  const itemsTotal = items.reduce((prev, curr) => {
    const itemTotal = calculateTotalCost(curr.price, curr.discount, curr.quantity);
    return prev + Number(itemTotal);
  }, 0);

  const servicesTotal = services.reduce((prev, curr) => {
    if (!curr.checked) {
      return prev;
    }
    const serviceTotal = calculateTotalCost(curr.price, curr.discount, '1');
    return prev + Number(serviceTotal);
  }, 0);

  const subTotal = itemsTotal + servicesTotal;
  const total = Number(subTotal) - Number(discount);
  
  return (
    <Card>
      <CardContent className="pt-4">
        <div>
          <TypographyH3 className="flex items-center gap-2">
            <WalletCards />
            Payment Details
          </TypographyH3>
          <div>
            <PaymentDetailElement className="mt-4" label="Sub Total">
              $ {subTotal}
            </PaymentDetailElement>
            <PaymentDetailElement className="mt-2" label="Discount">
              <PrefixedCurrencyInput 
                value={discount}
                onValueChange={(value) => setDiscount(value || '')}
              />
            </PaymentDetailElement>
            <Separator className="mt-2" />
            <PaymentDetailElement className="mt-2" label="Total">
              $ {total}
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