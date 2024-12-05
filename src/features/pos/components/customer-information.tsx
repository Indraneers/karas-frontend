import { cn } from "@/lib/utils";
import { OrderDetailElement } from "./order-detail-element";
import { TypographyH3 } from "@/components/ui/typography/h3";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User } from "lucide-react";

interface CustomerInformationProps {
  className?: string;
}

export function CustomerInformation({ className } : CustomerInformationProps) {
  return (
    <Card className={cn([
      className
    ])}>
      <CardHeader>
        <TypographyH3 className="flex justify-center gap-2 w-full text-center">
          <span>
            <User />
          </span>
          Customer Info
        </TypographyH3>
      </CardHeader>
      <Separator />
      <CardContent className="mt-2">
        <OrderDetailElement 
          label="Name"
          className="flex flex-col mt-2" 
        >
        Evan
        </OrderDetailElement>
        <OrderDetailElement 
          label="Phone Number"
          className="flex flex-col mt-2" 
        >
        +855 69 980 981
        </OrderDetailElement>
        <OrderDetailElement 
          label="Address"
          className="flex flex-col mt-2 text-center" 
        >
          44B St 134 Sangkat Toul Sangke Russei Keo Phnom Penh
        </OrderDetailElement>
      </CardContent>
    </Card>
  );
}