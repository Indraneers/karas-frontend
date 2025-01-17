import { CustomerDto } from "@/features/customer/types/customer.dto";
import { SaleDetailElement } from "./sale-detail-element";
import { cn } from "@/lib/utils";
import { TypographyH2 } from "@/components/ui/typography/h2";
import { Skeleton } from "@/components/ui/skeleton";

export function CustomerInformation({ customer, className, isLoading = false } : { customer: CustomerDto | null, className?: string, isLoading?: boolean }) {
  if (isLoading || !customer) {
    return (
      <div>
        <Skeleton className="w-full h-8" />
        <Skeleton className="mt-2 w-full h-8" />
        <Skeleton className="mt-4 w-full h-8" />
      </div>
    );
  }
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