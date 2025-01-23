import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { InvoiceDetailElement } from "./invoice-detail-element";
import { CustomerDto } from "@/features/customer/types/customer.dto";

export function CustomerInfo({ customer, className }: { customer: CustomerDto, className?: string }) {
  return (
    <div className={cn([
      "items-center grid grid-cols-[auto,auto,1fr]",
      className
    ])}>
      <h3 className="font-bold text-lg">Customer</h3>
      <Separator className="ml-4" orientation="vertical" />
      <div className="justify-items-center items-center gap-4 grid grid-cols-6">
        <InvoiceDetailElement label="Billed To">
          <span className="font-semibold">{ customer.name }</span>
        </InvoiceDetailElement>
        <InvoiceDetailElement label="Contact">
          { customer.contact }
        </InvoiceDetailElement>
        <InvoiceDetailElement className="col-span-4" label="Address">
          { customer.address }
        </InvoiceDetailElement>
      </div>
    </div>
  );
}