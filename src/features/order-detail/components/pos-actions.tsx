import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Banknote, Landmark, Pause, ShoppingCart, Trash } from "lucide-react";
import { usePosStore } from "../../pos/store/pos";
import { SaleRequestDto, SaleResponseDto } from "@/features/sale/types/sale.dto";
import { PaymentType, StatusEnum } from "@/features/sale/types/sale";
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
  const [status, setStatus] = useState(StatusEnum.PAID);
  const [openDialog, setOpenDialog] = useState(false);
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

  async function handlePOSAction(status: StatusEnum, paymentType: PaymentType) {
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
      paymentType,
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

    if (!sale.dueAt && sale.status === StatusEnum.HOLD) {
      toastError('Due Date is not set');
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
          onClick={() =>{
            setOpenDialog(true);
            setStatus(StatusEnum.PAID);
          }}
          className="bg-green-500 hover:bg-green-400 rounded-r-none rounded-l-xl font-semibold"
        >
          <span>
            <ShoppingCart />
          </span>
          Pay
        </Button>
        <Button
          onClick={() => {
            setOpenDialog(true);
            setStatus(StatusEnum.HOLD);
          }}
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
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Payment
            </DialogTitle>
          </DialogHeader>
          <div className={cn([
            "w-full hidden",
            status === StatusEnum.HOLD && 'block'
          ])}>
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
            <div className="flex justify-center space-x-4 w-full">
              <Button onClick={() => handlePOSAction(status, PaymentType.BANK)} className="bg-blue-500 hover:bg-blue-600 w-full h-12">
                <Landmark className="!w-6 !h-6" strokeWidth={2} />
                  PAY BY BANK
              </Button>
              <Button onClick={() => handlePOSAction(status, PaymentType.CASH)} className="bg-emerald-500 hover:bg-emerald-600 w-full h-12">
                <Banknote className="!w-6 !h-6"  strokeWidth={2} />
                  PAY BY CASH
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>

  );
}