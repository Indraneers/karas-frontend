import { cn } from "@/lib/utils";
import { OrderDetailElement } from "./order-detail-element";
import { TypographyH3 } from "@/components/ui/typography/h3";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface CustomerInformationProps {
  className?: string;
}

export function CustomerInformation({ className } : CustomerInformationProps) {
  return (
    <Card className={cn([
      className
    ])}>
      <CardHeader className="bg-accent rounded-t-xl text-background">
        <TypographyH3 className="w-full text-center">
          Customer Information
        </TypographyH3>
      </CardHeader>
      <Separator />
      <CardContent className="mt-2">
        <OrderDetailElement 
          label="Name"
        >
        Evan
        </OrderDetailElement>
        <OrderDetailElement 
          label="Phone Number"
          className="mt-2" 
        >
        +855 69 980 981
        </OrderDetailElement>
        <OrderDetailElement 
          label="Address"
          className="mt-2" 
        >
          <div className="text-right">
          44B St 134 Sangkat Toul Sangke Russei Keo Phnom Penh
          </div>
        </OrderDetailElement>
      </CardContent>
    </Card>
  );
}