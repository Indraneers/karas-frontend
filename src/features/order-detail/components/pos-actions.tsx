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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { useAuth } from "react-oidc-context";

interface PosActionsProps {
  className?: string;
  saleId?: string;
  handlePayment: (saleRequestDto: SaleRequestDto) => Promise<SaleResponseDto>;
}

export function POSActions({ saleId, className, handlePayment } : PosActionsProps) {
  const [payOpen, setPayOpen] = useState(false);
  const [holdOpen, setHoldOpen] = useState(false);
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
  
  function fire(status: StatusEnum, paymentType: PaymentType) {
    setPayOpen(false);
    setHoldOpen(false);
    handlePOSAction(status, paymentType);
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Popover open={payOpen} onOpenChange={setPayOpen}>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            className="flex-1 h-9 bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-sm"
          >
            <ShoppingCart className="size-4" strokeWidth={1.8} /> Pay
          </Button>
        </PopoverTrigger>
        <GlassPopoverContent>
          <PaymentTypePicker
            label="Pay"
            onPick={(pt) => fire(StatusEnum.PAID, pt)}
          />
        </GlassPopoverContent>
      </Popover>

      <Popover open={holdOpen} onOpenChange={setHoldOpen}>
        <PopoverTrigger asChild>
          <Button size="sm" variant="outline" className="h-9 font-medium">
            <Pause className="size-4" strokeWidth={1.8} /> Hold
          </Button>
        </PopoverTrigger>
        <GlassPopoverContent>
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground mb-1.5">
                Due date
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
            <PaymentTypePicker
              label="Hold"
              onPick={(pt) => fire(StatusEnum.HOLD, pt)}
            />
          </div>
        </GlassPopoverContent>
      </Popover>

      <Button
        onClick={() => resetPos()}
        size="sm"
        variant="ghost"
        className="h-9 px-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        aria-label="Reset"
      >
        <Trash className="size-4" strokeWidth={1.8} />
      </Button>
    </div>
  );
}

/** Translucent popover with backdrop-filter applied to an inner div so the
 *  blur isn't clipped by Radix's transform-positioned wrapper. */
function GlassPopoverContent({ children }: { children: React.ReactNode }) {
  return (
    <PopoverContent
      align="end"
      sideOffset={8}
      className="bg-transparent w-72 p-0 border-none shadow-none"
      style={{ backgroundColor: "transparent" }}
    >
      <div
        className="rounded-xl border border-border/60 shadow-2xl overflow-hidden p-3"
        style={{
          backgroundColor: "rgba(245, 248, 255, 0.6)",
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(220,230,245,0.35) 100%)",
          backdropFilter: "saturate(180%) blur(24px)",
          WebkitBackdropFilter: "saturate(180%) blur(24px)",
        }}
      >
        {children}
      </div>
    </PopoverContent>
  );
}

function PaymentTypePicker({
  label,
  onPick,
}: {
  label: string;
  onPick: (paymentType: PaymentType) => void;
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground mb-2">
        {label} with
      </p>
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={() => onPick(PaymentType.BANK)}
          variant="outline"
          className="h-11 font-medium bg-white/60 backdrop-blur-sm"
        >
          <Landmark className="size-4" strokeWidth={1.8} /> Bank
        </Button>
        <Button
          onClick={() => onPick(PaymentType.CASH)}
          className="h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
        >
          <Banknote className="size-4" strokeWidth={1.8} /> Cash
        </Button>
      </div>
    </div>
  );
}