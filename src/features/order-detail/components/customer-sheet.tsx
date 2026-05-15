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
import type { ReactNode } from "react";

interface CustomerSheetProps {
  customer: CustomerDto;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: ReactNode;
}

/**
 * Read-only sheet that surfaces a picked customer's details while the
 * cashier is mid-order. Edit jumps to the customer route; Clear removes
 * the customer from the POS state without leaving the page.
 */
export function CustomerSheet({ customer, open, onOpenChange }: CustomerSheetProps) {
  const navigate = useNavigate();
  const { setCustomer } = usePosStore();

  function handleClear() {
    setCustomer({ id: "", name: "", note: "", address: "", contact: "" });
    onOpenChange(false);
  }

  function handleEdit() {
    onOpenChange(false);
    navigate({ to: "/customers/edit/" + customer.id });
  }

  function handleOpenProfile() {
    onOpenChange(false);
    navigate({ to: "/customers/" + customer.id });
  }

  return (
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
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-sm font-medium text-foreground">Recent sales</h3>
              <span className="text-[11px] text-muted-foreground">Coming soon</span>
            </div>
            <ul className="space-y-1.5 text-xs">
              {[1, 2, 3].map((i) => (
                <li
                  key={i}
                  className="flex items-center justify-between rounded-md border border-dashed border-border/60 bg-muted/30 px-3 py-2 text-muted-foreground"
                >
                  <span>Sale placeholder #{i}</span>
                  <span className="tabular-nums">— · — items · $—</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-auto px-5 py-3 border-t border-border/60 flex items-center justify-between gap-2">
          <Button variant="ghost" size="sm" onClick={handleClear}>
            <X className="size-4" /> Remove
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Edit className="size-4" /> Edit
            </Button>
            <Button variant="outline" size="sm" onClick={handleOpenProfile}>
              <ExternalLink className="size-4" /> Profile
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
