import {
  SaleRequestDto,
  SaleResponseDto,
} from "@/features/sale/types/sale.dto";
import { PaymentTab } from "./payment-tab";
import { Badge } from "@/components/ui/badge";

interface OrderDetailsProps {
  saleId?: string;
  handlePayment: (saleRequestDto: SaleRequestDto) => Promise<SaleResponseDto>;
}

export function OrderDetails({ saleId, handlePayment }: OrderDetailsProps) {
  return (
    <aside className="flex flex-col flex-1 min-h-0 border border-border/60 rounded-xl bg-card overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/60 bg-muted/30">
        <h2 className="font-display text-base font-medium tracking-tight text-foreground">
          Order
        </h2>
        {saleId && (
          <Badge variant="outline" className="font-mono text-[10px]">
            {saleId.slice(0, 8)}
          </Badge>
        )}
      </div>
      <div className="flex flex-col flex-1 min-h-0">
        <PaymentTab saleId={saleId} handlePayment={handlePayment} />
      </div>
    </aside>
  );
}
