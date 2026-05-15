import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CustomerForm } from "@/features/customer/components/customer-form";
import { createCustomer } from "@/features/customer/api/customer";
import { CustomerDto } from "@/features/customer/types/customer.dto";
import { usePosStore } from "@/features/pos/store/pos";
import { toastError } from "@/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Inline create-customer flow for the POS — keeps the cashier on the page.
 * Hits the existing /customers POST, then attaches the freshly-created
 * customer to the open order.
 */
export function CustomerCreateSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const { setCustomer } = usePosStore();

  const mutation = useMutation({
    mutationFn: (dto: CustomerDto) => createCustomer(dto),
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      if (created) setCustomer(created);
      onOpenChange(false);
    },
    onError: (err) => toastError(err.message),
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[480px] sm:max-w-[480px] gap-0 p-0">
        <SheetHeader className="px-5 py-4 border-b border-border/60">
          <SheetTitle className="font-display text-xl font-medium">
            New customer
          </SheetTitle>
          <SheetDescription className="text-xs">
            Save the customer and immediately attach them to this order.
          </SheetDescription>
        </SheetHeader>
        <div className="px-5 py-5 overflow-y-auto flex-1">
          <CustomerForm handleSubmit={(v) => mutation.mutate(v)} isSheet />
        </div>
      </SheetContent>
    </Sheet>
  );
}
