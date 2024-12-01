import { cn } from "@/lib/utils";
import { OrderDetailElement } from "./order-detail-element";
import { TypographyH3 } from "@/components/ui/typography/h3";
import { CustomerSearch } from "@/features/customer/components/customer-search";
import { Textarea } from "@/components/ui/textarea";

interface CustomerInformationProps {
  className?: string;
}

export function CustomerInformation({ className } : CustomerInformationProps) {
  return (
    <div className={cn([
      className
    ])}>
      <TypographyH3>
          Customer Information
      </TypographyH3>
      <OrderDetailElement 
        label="Name"
        className="mt-1" 
      >
        <CustomerSearch />
      </OrderDetailElement>
      <Textarea className="mt-2 text-xs placeholder:text-xs" placeholder="Customer Notes" />
    </div>
  );
}