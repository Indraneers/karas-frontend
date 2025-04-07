import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pause, ShoppingCart, Trash } from "lucide-react";
import { usePosStore } from "../../pos/store/pos";
import { SaleRequestDto, SaleResponseDto } from "@/features/sale/types/sale.dto";
import { StatusEnum } from "@/features/sale/types/sale";
import { convertPosStoreToSaleRequestDto } from "../../pos/utils/pos";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useItemSelectionStore } from "@/features/item-selector/store/item-selection";
import { ItemSelectionEnum } from "@/features/item-selector/types/item-selection-enum";
import { toastError } from "@/lib/toast";
import { getSubtotal } from "@/features/sale/utils/sale";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { useAuth } from "react-oidc-context";

interface PosActionsProps {
  className?: string;
  saleId?: string;
  handlePayment: (saleRequestDto: SaleRequestDto) => Promise<SaleResponseDto>;
}

export function POSActions({ saleId, className, handlePayment } : PosActionsProps) {
  const [openHoldDialog, setOpenHoldDialog] = useState(false);
  const { dueAt, setDueAt, items, maintenance, discount, customer, vehicle, resetPos } = usePosStore();
  const { services } = maintenance;
  const { setSelector } = useItemSelectionStore();
  const navigate = useNavigate();
  const auth = useAuth();
  const user = auth.user?.profile;

  const saleMutation = useMutation({
    mutationFn: (saleRequestDto: SaleRequestDto) => {
      if (saleId) {
        saleRequestDto.id = saleId;
      }
      return handlePayment(saleRequestDto);
    },
    onError: (error) => {
      toastError(error.message);
    }
  });

  async function handlePOSAction(status: StatusEnum) {
    const sale: SaleRequestDto = convertPosStoreToSaleRequestDto(
      {
        items,
        maintenance,
        discount,
        customer,
        vehicle,
        dueAt,
        serviceSelectorItems: [],
        isInit: false
      },
      status,
      user?.sub || ''
    );

    if (!sale.customerId || !sale.vehicleId) {
      toastError('Customer and Vehicle are empty');
      return;
    }
    
    if (!sale.items) {
      toastError('Cart is empty, please add something');
      return;
    }

    if (!sale.userId) {
      toastError('Error, initiated user is not set');
      return;
    }

    if (!sale.dueAt || !sale.createdAt) {
      toastError('Due Date or Created Date is not set');
      return;
    }

    // const checkedServices = getCheckedServiceItem(services);

    if ((getSubtotal({ items, maintenanceServices: services }) - sale.discount) < 0) {
      toastError('Total is negative');
      return;
    }
    
    const data = await saleMutation.mutateAsync(sale);
    resetPos();
    setSelector(ItemSelectionEnum.CATEGORY);
    navigate({ to: '/sales/' + data.id + '?print=true' });
  }
  
  return (
    <>
      <div className={cn([
        'grid grid-cols-3 ',
        className
      ])}>
        <Button 
          onClick={() => handlePOSAction(StatusEnum.PAID)}
          className="bg-green-500 hover:bg-green-400 rounded-r-none rounded-l-xl font-semibold"
        >
          <span>
            <ShoppingCart />
          </span>
        Pay
        </Button>
        <Button
          onClick={() => setOpenHoldDialog(true)}
          className="bg-amber-500 hover:bg-amber-400 rounded-none font-semibold"
        >
          <span>
            <Pause />
          </span>
        Hold
        </Button>
        <Button 
          onClick={() => resetPos()}
          className="bg-primary rounded-r-xl rounded-l-none font-semibold"
        >
          <span>
            <Trash />
          </span>
        Reset
        </Button>
      </div>
      <Dialog open={openHoldDialog} onOpenChange={setOpenHoldDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Set Due Date for Payment
            </DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <label className="text-muted-foreground text-xs">
                Due Date
            </label>
            <DateTimePicker
              hourCycle={12}
              value={dueAt}
              onChange={setDueAt} 
              locale={undefined}
              weekStartsOn={undefined} 
              showWeekNumber={undefined} 
              showOutsideDays={undefined}      
            />
          </div> 
          <DialogFooter>
            <Button onClick={() => handlePOSAction(StatusEnum.HOLD)} className="w-full">
              <ShoppingCart />
              Submit Sale
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>

  );
}