import { ItemCart, ItemCartService, ItemCartUnit } from "@/features/cart/components/item-cart";
import { usePosStore } from "@/features/pos/store/pos";
import { Separator } from "@/components/ui/separator";
import { POSActions } from "@/features/order-detail/components/pos-actions";
import { SaleRequestDto, SaleResponseDto } from "@/features/sale/types/sale.dto";

interface PaymentTabProps {
  saleId?: string;
  handlePayment: (saleRequestDto: SaleRequestDto) => Promise<SaleResponseDto>;
}


export function PaymentTab({ saleId, handlePayment }: PaymentTabProps) {
  const { maintenance, items } = usePosStore();
  const { services } = maintenance;
  const empty = items.length === 0 && services.length === 0;

  return (
    <div className="flex flex-col h-full min-h-0">
      <ItemCart className="flex-1 min-h-0 overflow-y-auto px-3 pt-3 pb-2 space-y-2">
        {empty && (
          <div className="grid place-content-center w-full h-full text-muted-foreground text-sm text-center">
            Cart is empty — pick an item to start.
          </div>
        )}
        {items.map((i) => (
          <ItemCartUnit item={i} key={i.id} />
        ))}
        {items.length > 0 && services.length > 0 && (
          <Separator className="my-2" />
        )}
        {services.length > 0 &&
          services.map((s) => (
            <ItemCartService maintenanceService={s} key={s.service.id} />
          ))}
      </ItemCart>
      <div className="shrink-0 border-t border-border/60 bg-card/60 backdrop-blur-sm">
        <PaymentDetail className="px-4 py-3">
          <POSActions
            saleId={saleId}
            handlePayment={handlePayment}
            className="mt-3"
          />
        </PaymentDetail>
      </div>
    </div>
  );
}

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
    <div className={cn(className)}>
      <div className="space-y-2">
        <PaymentDetailElement label="Sub Total">
          <Currency amount={subTotal} />
        </PaymentDetailElement>
        <PaymentDetailElement label="Discount">
          <PrefixedCurrencyInput
            defaultValue={discount}
            onValueChange={(value) => setDiscount(value)}
          />
        </PaymentDetailElement>
        <Separator />
        <PaymentDetailElement
          label={<span className="text-foreground font-medium">Total</span>}
        >
          <span className="font-display text-lg font-medium tabular-nums">
            <Currency amount={total} />
          </span>
        </PaymentDetailElement>
      </div>
      {children}
    </div>
  );
}
interface PaymentDetailElementProps {
  className?: string;
  children: React.ReactNode;
  label: React.ReactNode;
}

export function PaymentDetailElement({ className, label, children } : PaymentDetailElementProps) {
  return (
    <div className={cn([
      'flex justify-between w-full text-sm items-center',
      className
    ])}>
      <span className="text-foreground/50">{label}</span>
      <div className="justify-self-end font-medium">
        {children}
      </div>
    </div>
  );
}