import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pause, ShoppingCart, Trash } from "lucide-react";
import { usePosStore } from "../store/pos";
import { SaleRequestDto, SaleResponseDto } from "@/features/sale/types/sale.dto";
import { StatusEnum } from "@/features/sale/types/sale";
import { convertPosStoreToSaleRequestDto } from "../utils/pos";
import { useMutation } from "@tanstack/react-query";

interface PosActionsProps {
  className?: string;
  saleId?: string;
  handlePayment: (saleRequestDto: SaleRequestDto) => Promise<SaleResponseDto>;
}

export function POSActions({ saleId, className, handlePayment } : PosActionsProps) {
  const { items, services, discount, customer, vehicle, resetPos } = usePosStore();
  const currentDate = new Date().toISOString().slice(0, -1);

  const saleMutation = useMutation({
    mutationFn: (saleRequestDto: SaleRequestDto) => {
      if (saleId) {
        saleRequestDto.id = saleId;
      }
      return handlePayment(saleRequestDto);
    }
  });

  function handlePOSAction(dueDate: string, status: StatusEnum) {
    const sale: SaleRequestDto = convertPosStoreToSaleRequestDto(
      {
        items,
        services,
        discount,
        customer,
        vehicle
      },
      dueDate,
      status
    );

    saleMutation.mutate(sale);
  }
  
  return (
    <div className={cn([
      'grid grid-cols-3 ',
      className
    ])}>
      <Button 
        onClick={() => handlePOSAction(currentDate, StatusEnum.PAID)}
        className="bg-green-500 hover:bg-green-400 rounded-l-full rounded-r-none font-semibold"
      >
        <span>
          <ShoppingCart />
        </span>
        Pay
      </Button>
      <Button
        onClick={() => handlePOSAction(currentDate, StatusEnum.UNPAID)}
        className="bg-amber-500 hover:bg-amber-400 rounded-none font-semibold"
      >
        <span>
          <Pause />
        </span>
        Hold
      </Button>
      <Button 
        onClick={() => resetPos()}
        className="bg-primary rounded-l-none rounded-r-full font-semibold"
      >
        <span>
          <Trash />
        </span>
        Reset
      </Button>
    </div>
  );
}