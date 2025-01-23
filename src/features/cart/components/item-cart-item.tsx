import { Currency } from "@/components/currency";
import { Button } from "@/components/ui/button";
import { ProductRequestDto } from "@/features/product/types/product.dto";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { MouseEventHandler } from "react";

interface ItemCartItemProps {
  children?: React.ReactNode;
  product?: ProductRequestDto;
  totalCost: number;
  onClickRemove?: MouseEventHandler<HTMLButtonElement>;
}

export function ItemCartItem
({ children, totalCost, onClickRemove }: ItemCartItemProps) {
  return (
    <div className={cn([
      "relative border border-primary bg-accent rounded-lg"
    ])}>
      <Button
        onClick={onClickRemove}
        className="top-[-0.5rem] left-[-0.5rem] absolute hover:bg-primary/80 border w-5 h-5" 
        size='icon'>
        <X className="!w-3 !h-3" />
      </Button>
      <div className="rounded-t-lg w-full h-full overflow-hidden">
        <div className="flex flex-col items-center h-full">
          <div className="flex-grow bg-card p-2 rounded-t-lg w-full">
            {children}
          </div>
          <div className="place-content-center grid py-2 font-medium text-background text-xs">
            <Currency amount={totalCost} />
          </div>
        </div>
      </div>
    </div>
  );
}