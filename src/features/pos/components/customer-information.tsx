import { cn } from "@/lib/utils";
import { OrderDetailElement } from "./order-detail-element";
import { TypographyH3 } from "@/components/ui/typography/h3";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
      <CardHeader className="px-0 pt-0">
        <TypographyH3 className="flex gap-2 w-full text-center">
          <span>
            <User />
          </span>
          Customer Info
        </TypographyH3>
      </CardHeader>
      <Separator />
      <CardContent className="mt-2 px-0">
        <OrderDetailElement 
          label="Name"
          className="mt-2" 
        >
          {customer.name}
        </OrderDetailElement>
        <OrderDetailElement 
          label="Phone Number"
          className="mt-2" 
        >
          {customer.contact}
        </OrderDetailElement>
        <OrderDetailElement 
          label="Address"
          className="mt-2" 
        >
          <div className="text-right">
            {customer.address}
          </div>
        </OrderDetailElement>
      </CardContent>
    </div>
  );
}