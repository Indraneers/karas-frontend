import { CustomerDto } from "@/features/customer/types/customer.dto";
import { cn } from "@/lib/utils";
import { TypographyH2 } from "@/components/ui/typography/h2";
import { InfoField } from "@/components/info-field";

export function CustomerInformation({ customer, className } : { customer: CustomerDto, className?: string }) {
  return (
    <div className={cn([
      className
    ])}>
      <TypographyH2>
          Customer Detail
      </TypographyH2>
      <div className="flex justify-between mt-2">
        <InfoField label="Name">
          <span className="font-medium">{customer.name}</span>
        </InfoField>
        <InfoField label="Phone Number">
          {customer.contact}
        </InfoField>
      </div>
      <InfoField className="mt-2" label="Address">
        {customer.address}
      </InfoField>
    </div>
  );
}