import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { InfoField } from "@/components/info-field";
import { CustomerDto } from "@/features/customer/types/customer.dto";
import { usePosStore } from "@/features/pos/store/pos";
import { useNavigate } from "@tanstack/react-router";
import { Edit, ExternalLink, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCustomer } from "@/features/customer/api/customer";
import { CustomerForm } from "@/features/customer/components/customer-form";
import { RecentSales } from "@/features/sale/components/recent-sales";

interface CustomerSheetProps {
  customer: CustomerDto;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: ReactNode;
}

/**
 * Read-only sheet that surfaces a picked customer's details while the
 * cashier is mid-order. Edit opens an inline edit sheet (no page reroute);
 * Clear removes the customer from POS state; Profile opens the full page.
 */
export function CustomerSheet({ customer, open, onOpenChange }: CustomerSheetProps) {
  const navigate = useNavigate();
  const { setCustomer } = usePosStore();
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);

  const updateMutation = useMutation({
    mutationFn: (dto: CustomerDto) => updateCustomer(customer.id, dto),
    onSuccess: (updated) => {
      if (updated) setCustomer(updated);
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  function handleClear() {
    setCustomer({ id: "", name: "", note: "", address: "", contact: "" });
    onOpenChange(false);
  }

  function handleEdit() {
    setEditOpen(true);
  }

  function handleOpenProfile() {
    onOpenChange(false);
    navigate({ to: "/customers/" + customer.id });
  }

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-[420px] sm:max-w-[420px] gap-0 p-0">
          <SheetHeader className="px-5 py-4 border-b border-border/60">
            <SheetTitle className="font-display text-xl font-medium">
              {customer.name || "Customer"}
            </SheetTitle>
            <SheetDescription className="text-xs">
              Details for the customer attached to this order.
            </SheetDescription>
          </SheetHeader>

          <div className="px-5 py-5 space-y-5 overflow-y-auto flex-1">
            <section className="space-y-3">
              <h3 className="font-display text-sm font-medium text-foreground">Details</h3>
              <InfoField label="Phone Number">{customer.contact || "—"}</InfoField>
              <InfoField label="Address">{customer.address || "—"}</InfoField>
              {customer.note && <InfoField label="Note">{customer.note}</InfoField>}
            </section>

            <section className="space-y-2">
              <h3 className="font-display text-sm font-medium text-foreground">Recent sales</h3>
              {customer.id && <RecentSales customerId={customer.id} />}
            </section>
          </div>

          <div className="mt-auto px-5 py-3 border-t border-border/60 flex items-center justify-between gap-2">
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <X className="size-4" /> Remove
            </Button>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={handleEdit}
                className="bg-blue-600 hover:bg-blue-500 text-white"
              >
                <Edit className="size-4" /> Edit
              </Button>
              <Button variant="outline" size="sm" onClick={handleOpenProfile}>
                <ExternalLink className="size-4" /> Profile
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={editOpen} onOpenChange={setEditOpen}>
        <SheetContent side="right" className="w-[480px] sm:max-w-[480px] gap-0 p-0">
          <SheetHeader className="px-5 py-4 border-b border-border/60">
            <SheetTitle className="font-display text-xl font-medium">Edit Customer</SheetTitle>
            <SheetDescription className="text-xs">
              Make changes to this customer.
            </SheetDescription>
          </SheetHeader>
          <div className="px-5 py-5 overflow-y-auto flex-1">
            <CustomerForm
              data={customer}
              isSheet
              handleSubmit={async (dto: CustomerDto) => {
                const updated = await updateMutation.mutateAsync(dto);
                if (updated) setCustomer(updated);
                setEditOpen(false);
              }}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
