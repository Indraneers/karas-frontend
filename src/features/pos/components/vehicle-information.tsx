import { cn } from "@/lib/utils";
import { OrderDetailElement } from "./order-detail-element";
import { TypographyH3 } from "@/components/ui/typography/h3";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Car } from "lucide-react";

interface VehicleInformationProps {
  className?: string;
}

export function VehicleInformation({ className }: VehicleInformationProps) {
  return (
    <Card className={cn([
      className
    ])}>
      <CardHeader className="bg-accent rounded-t-xl text-background">
        <TypographyH3 className="flex justify-center items-center gap-2 w-full">
          <span>
            <Car />
          </span>
          Vehicle Information
        </TypographyH3>
      </CardHeader>
      <Separator />
      <CardContent className="gap-2 grid grid-cols-[3fr,auto,1fr] mt-2">
        <div>
          <OrderDetailElement label="Make and Model">
        Toyota Prius 2017
          </OrderDetailElement>
          <OrderDetailElement label="Plate Number" className="mt-2">
        ASF-PP-123
          </OrderDetailElement>
          <OrderDetailElement label="VIN N.O" className="mt-2">
        JKDWADWAKDA0231
          </OrderDetailElement>
          <OrderDetailElement label="Engine N.O" className="mt-2">
        WDAWDK-12DAW-1
          </OrderDetailElement>
          <OrderDetailElement label="Mileage" className="mt-2">
        10000 k.m
          </OrderDetailElement>
        </div>
        <Separator orientation="vertical" />
        <OrderDetailElement label="Vehicle Notes" className="flex flex-col pb-2 h-full text-center">
          <Textarea className="mt-2 rounded-sm h-full text-xs" placeholder="Add vehicle notes here..." />
        </OrderDetailElement>
      </CardContent>
    </Card>
  );
}