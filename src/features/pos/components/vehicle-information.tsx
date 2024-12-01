import { cn } from "@/lib/utils";
import { OrderDetailElement } from "./order-detail-element";
import { VehicleSearch } from "@/features/vehicles/components/vehicle-search";
import { TypographyH3 } from "@/components/ui/typography/h3";
import { Textarea } from "@/components/ui/textarea";

interface VehicleInformationProps {
  className?: string;
}

export function VehicleInformation({ className }: VehicleInformationProps) {
  return (
    <div className={cn([
      className
    ])}>
      <TypographyH3>
        Vehicle Information
      </TypographyH3>
      <OrderDetailElement label="Make and Model" className="mt-1">
        <VehicleSearch />
      </OrderDetailElement>
      <OrderDetailElement label="Plate Number" className="mt-1">
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
      <Textarea className="mt-2 text-xs" placeholder="Vehicle Notes" />
    </div>
  );
}