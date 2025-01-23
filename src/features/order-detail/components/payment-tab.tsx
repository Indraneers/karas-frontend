import { ItemCart } from "@/features/cart/components/item-cart";
import { ItemCartService } from "@/features/cart/components/item-cart-service";
import { ItemCartUnit } from "@/features/cart/components/item-cart-unit";
import { usePosStore } from "@/features/pos/store/pos";
import { Separator } from "@/components/ui/separator";
import { PaymentDetail } from "./payment-detail";
import { POSActions } from "@/features/pos/components/pos-actions";
import { SaleRequestDto, SaleResponseDto } from "@/features/sale/types/sale.dto";

interface PaymentTabProps {
  saleId?: string;
  handlePayment: (saleRequestDto: SaleRequestDto) => Promise<SaleResponseDto>;
}


export function PaymentTab({ saleId, handlePayment }: PaymentTabProps) {
  const { maintenance, items } = usePosStore();
  const { services } = maintenance;
  return (
    <div className="flex flex-col h-full">
      <ItemCart className="flex-grow mt-4 px-4">
        { items.length === 0 && services.length == 0 &&
            <div className="place-content-center grid w-full h-full text-center text-muted-foreground">
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