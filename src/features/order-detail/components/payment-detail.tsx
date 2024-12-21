import { Card, CardContent } from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typography/h3";
import { WalletCards } from "lucide-react";
import { PaymentDetailElement } from "./payment-detail-element";
import { Separator } from "@/components/ui/separator";
import { usePosStore } from "@/features/pos/store/pos";
import { PrefixedCurrencyInput } from "@/components/prefixed-currency-input";
import { getSubtotal } from "@/features/sale/utils/sale";
import { getCheckedServiceItem } from "@/features/service-selector/utils/service-selector";
import { Currency } from "@/components/currency";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { convertCurrencyToInputString, convertStringToCurrency } from "@/lib/currency";

export function PaymentDetail({ saleId, children } : { saleId?: string, children: React.ReactNode}) {
  const { dueDate, setDueDate, items, services, discount, setDiscount } = usePosStore();

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

          <div className="mt-2">
            <PaymentDetailElement label="Due Date">
              <DateTimePicker 
                className="w-full h-6 font-medium" 
                value={dueDate} 
                onChange={setDueDate} 
                use12HourFormat
              />
            </PaymentDetailElement>
            <PaymentDetailElement className="mt-4" label="Sub Total">
              <Currency amount={subTotal} />
            </PaymentDetailElement>
            <PaymentDetailElement className="mt-1" label="Discount">
              <PrefixedCurrencyInput 
                key={saleId}
                defaultValue={convertCurrencyToInputString(discount)}
                onValueChange={(value) => {
                  if (value?.at(-1) !== '.') {
                    setDiscount(convertStringToCurrency(value || ''));
                  } 
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
      </CardContent>
    </Card>
  );
}