import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { VehicleForm } from "@/features/vehicle/components/vehicle-form";
import { createVehicle } from "@/features/vehicle/api/vehicle";
import { VehicleDto } from "@/features/vehicle/types/vehicle.dto";
import { usePosStore } from "@/features/pos/store/pos";
import { toastError } from "@/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Inline create-vehicle flow. On success, attaches both the new vehicle
 * and its (now-linked) customer to the open POS order.
 */
export function VehicleCreateSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const { customer, setVehicleAndCustomer } = usePosStore();
  const hasCustomer = !!customer?.id;

  const mutation = useMutation({
    mutationFn: (dto: VehicleDto) => createVehicle(dto),
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      if (created) setVehicleAndCustomer(created);
      onOpenChange(false);
    },
    onError: (err) => toastError(err.message),
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[520px] sm:max-w-[520px] gap-0 p-0">
        <SheetHeader className="px-5 py-4 border-b border-border/60">
          <SheetTitle className="font-display text-xl font-medium">
            New vehicle
          </SheetTitle>
          <SheetDescription className="text-xs">
            {hasCustomer
              ? `Owner pre-filled: ${customer.name || "—"}.`
              : "Save the vehicle (and its owner) and attach to this order."}
          </SheetDescription>
        </SheetHeader>
        <div className="px-5 py-5 overflow-y-auto flex-1">
          <VehicleForm
            handleSubmit={(v) => mutation.mutate(v)}
            defaultCustomer={hasCustomer ? customer : undefined}
            isSheet
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
