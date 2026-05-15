import { cn } from "@/lib/utils";
import { InvoiceDetailElement } from "./invoice-detail-element";
import { CustomerDto } from "@/features/customer/types/customer.dto";

export function CustomerInfo({ customer, className }: { customer: CustomerDto, className?: string }) {
  return (
    <div className={cn("grid grid-cols-[90px_1fr] items-center gap-x-4", className)}>
      <h3 className="font-display text-sm font-medium text-neutral-900">Customer</h3>
      <div className="grid grid-cols-6 gap-x-4 gap-y-1">
        <InvoiceDetailElement className="col-span-2" label="Billed To">
          <span className="font-medium">{customer.name || "—"}</span>
        </InvoiceDetailElement>
        <InvoiceDetailElement label="Contact">
          {customer.contact || "—"}
        </InvoiceDetailElement>
        <InvoiceDetailElement className="col-span-3" label="Address">
          {customer.address || "—"}
        </InvoiceDetailElement>
      </div>
    </div>
  );
}