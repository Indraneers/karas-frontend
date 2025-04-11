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
  return (
    <div className="flex flex-col h-[calc(100vh-16rem)]">
      <ItemCart className="flex-grow mt-4 px-4">
        { items.length === 0 && services.length == 0 &&
            <div className="place-content-center grid w-full h-full text-muted-foreground text-center">
              Empty...
            </div>
        }
        {items.map((i) => (
          <ItemCartUnit item={i} key={i.id} />
        ))}
        { (items.length > 0 &&  services.length > 0) &&
            <Separator className="bg-gray-400 my-2" />
        }
        { (services.length > 0) &&
            services.map((s) => (
              <ItemCartService maintenanceService={s} key={s.service.id} />
            ))
        }
      </ItemCart>
      <Separator className="mt-2" />
      <PaymentDetail className="my-4 px-4">
        <POSActions
          saleId={saleId}
          handlePayment={handlePayment} 
          className="mt-4"
        />
      </PaymentDetail>  
    </div>
  );
}

import { TypographyH3 } from "@/components/ui/typography/h3";
import { WalletCards } from "lucide-react";
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