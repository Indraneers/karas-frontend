import { Editable } from "@/components/editable";
import { Button } from "@/components/ui/button";

interface OrderInfoPaymentProps {
  className: string;
}

export function OrderInfoPayment({ className }: OrderInfoPaymentProps) {
  return (
    <div className={className}>
      <div className="text-primary-foreground/50">
        {/* Customer Name */}
        <div>
          Customer: <span className="text-primary-foreground">Xiaoyang Qiao</span>
        </div>
        {/* Product Total Discount */}
        <div className="flex justify-between mt-2">
          Product Total Discount: <span className="text-primary-foreground">$70.00</span>
        </div>
        {/* Order Discount */}
        <div className="flex justify-between mt-2">
          Product Total Discount: 
          <span className="text-primary-foreground">
            <Editable>
              <div className="px-1">$20.00</div>
            </Editable>
          </span>
        </div>
        {/* Total */}
        <div className="flex justify-between mt-8 font-semibold text-primary">
          Total: <span>$400.00</span>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex gap-4 my-8">
        <Button className="p-6 rounded-full" variant='outline'>
          Cancel Order
        </Button>
        <Button className="bg-primary-foreground/50 p-6 rounded-full text-background">
          Hold Order
        </Button> 
        <Button className="bg-primary-foreground ml-auto px-12 py-6 rounded-full text-background">
          Place Order
        </Button>
      </div>
    </div>
  );
}