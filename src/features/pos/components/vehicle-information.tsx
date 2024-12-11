import { cn } from "@/lib/utils";
import { OrderDetailElement } from "./order-detail-element";
import { TypographyH3 } from "@/components/ui/typography/h3";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Car, CircleUser, RotateCcw } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CustomerInformation } from "./customer-information";
import { VehicleDto } from "@/features/vehicles/dto/vehicle.dto";
import { usePosStore } from "../store/pos";

interface VehicleInformationProps {
  className?: string;
  vehicle: VehicleDto;
}

export function VehicleInformation({ className, vehicle }: VehicleInformationProps) {
  const { setDefaultVehicleAndCustomer } = usePosStore();
  return (
    <Card className={cn([
      className
    ])}>
      <CardHeader>
        <div className="items-center gap-4 grid grid-cols-[auto,1fr]">
          
          <TypographyH3 className="flex items-center gap-2 w-full">
            <span>
              <Car />
            </span>
          Vehicle
          </TypographyH3>

          <div className="flex justify-end items-center gap-2"> 
            <div className={cn([
              "items-center gap-4 rounded-full h-full hidden",
              vehicle.customer.name && 'flex'
            ])}>
              <Popover>
                <PopoverTrigger>
                  <Button
                    className="gap-2 border-accent/50 bg-accent/10 px-2 border rounded-full h-7 font-medium text-primary hover:text-background"
                  >
                    <CircleUser />
                    {vehicle.customer.name}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <CustomerInformation customer={vehicle.customer} />
                </PopoverContent>
              </Popover>
            </div>

            <Button
              variant='ghost'
              onClick={() => setDefaultVehicleAndCustomer()}
              className={cn([
                "hidden rounded-full text-primary hover:bg-transparent hover:text-primary",
                vehicle.customer.name && 'flex'
              ])}
              size='icon'
            >
              <RotateCcw className="!w-5 !h-5" />
            </Button>
          </div>
          
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="mt-2">
        <OrderDetailElement label="Make and Model">
          {vehicle.makeAndModel}
        </OrderDetailElement>
        <OrderDetailElement label="Plate Number" className="mt-2">
          {vehicle.plateNumber}
        </OrderDetailElement>
        <OrderDetailElement label="VIN N.O" className="mt-2">
          {vehicle.vinNo}
        </OrderDetailElement>
        <OrderDetailElement label="Engine N.O" className="mt-2">
          {vehicle.engineNo}
        </OrderDetailElement>
        <OrderDetailElement label="Mileage" className="mt-2">
          {vehicle.mileage === 0 ? '-' : `${ vehicle.mileage } km`}
        </OrderDetailElement>
        <Textarea 
          className="mt-2 rounded-sm h-full text-xs" 
          placeholder="Add vehicle notes here..."
          defaultValue={vehicle.note}
        />
      </CardContent>
    </Card>
  );
}