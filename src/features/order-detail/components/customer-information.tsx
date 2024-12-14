import { cn } from "@/lib/utils";
import { OrderDetailElement } from "./order-detail-element";
import { TypographyH3 } from "@/components/ui/typography/h3";
import { CardContent, CardHeader } from "@/components/ui/card";
import { User } from "lucide-react";
import { CustomerDto } from "@/features/customer/types/customer.dto";

interface CustomerInformationProps {
  className?: string;
  customer: CustomerDto;
}

export function CustomerInformation({ customer, className } : CustomerInformationProps) {
  return (
    <div className={cn([
      className
    ])}>
      <CardHeader className="px-2">
        <TypographyH3 className="flex gap-2 w-full text-md">
          <span>
            <User />
          </span>
          Customer Info
        </TypographyH3>
      </CardHeader>
      <CardContent className="px-2">
        <OrderDetailElement 
          label="Name"
          className="grid grid-cols-[1fr,2fr] mt-2" 
        >
          {customer.name}
        </OrderDetailElement>
        <OrderDetailElement 
          label="Phone Number"
          className="grid grid-cols-[1fr,2fr] mt-2" 
        >
          {customer.contact}
        </OrderDetailElement>
        <OrderDetailElement 
          label="Address"
          className="grid grid-cols-[1fr,2fr] mt-2" 
        >
          <div className="text-right">
            {customer.address}
          </div>
        </OrderDetailElement>
      </CardContent>
    </div>
  );
}