import { cn } from "@/lib/utils";
import { OrderDetailElement } from "./order-detail-element";
import { TypographyH3 } from "@/components/ui/typography/h3";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Car, User } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CustomerInformation } from "./customer-information";

interface VehicleInformationProps {
  className?: string;
}

export function VehicleInformation({ className }: VehicleInformationProps) {
  return (
    <Card className={cn([
      className
    ])}>
      <CardHeader>
        <div className="gap-4 grid grid-cols-[auto,auto,auto,1fr]">
          
          <TypographyH3 className="flex items-center gap-2 w-full">
            <span>
              <Car />
            </span>
          Vehicle
          </TypographyH3>
          
          <Separator orientation="vertical" />

          <div className="flex items-center gap-4 px-4 rounded-full h-full">
            <Popover>
              <PopoverTrigger>
                <Button className="rounded-full h-7">
                  <User />
                  Evan
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <CustomerInformation />
              </PopoverContent>
            </Popover>
          </div>
          
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="mt-2">
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
        <Textarea className="mt-2 rounded-sm h-full text-xs" placeholder="Add vehicle notes here..." />
      </CardContent>
    </Card>
  );
}