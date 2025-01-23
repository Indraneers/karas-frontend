import { CustomerDto } from "@/features/customer/types/customer.dto";
import { SaleDetailElement } from "./sale-detail-element";
import { cn } from "@/lib/utils";
import { TypographyH2 } from "@/components/ui/typography/h2";

export function CustomerInformation({ customer, className } : { customer: CustomerDto, className?: string }) {
  return (
    <div className={cn([
      className
    ])}>
      <TypographyH2>
          Customer Detail
      </TypographyH2>
      <div className="flex justify-between mt-2">
        <SaleDetailElement label="Name">
          <span className="font-medium">{customer.name}</span>
        </SaleDetailElement>
        <SaleDetailElement label="Phone Number">
          {customer.contact}
        </SaleDetailElement>
      </div>
      <SaleDetailElement className="mt-2" label="Address">
        {customer.address}
      </SaleDetailElement>
    </div>
  );
}