import { Textarea } from "@/components/ui/textarea";
import { TypographyH3 } from "@/components/ui/typography/h3";
import { SaleDetailElement } from "@/features/sale/components/sale-detail-element";
import { VehicleDto } from "@/features/vehicles/dto/vehicle.dto";
import { cn } from "@/lib/utils";
import { VehicleSelect } from "./vehicle-select";

interface VehicleInformationProps {
  className?: string;
  vehicle: VehicleDto;
}

export function VehicleInformation({ className, vehicle }: VehicleInformationProps) {
  return (
    <div className={cn([
      className
    ])}>
      <TypographyH3>
          Vehicle Information
      </TypographyH3>
      <SaleDetailElement className="mt-3" label="Make & Model">
        <VehicleSelect className="mt-1" />
      </SaleDetailElement>
      <SaleDetailElement className="mt-2" label="Plate Number">
        <span className="font-medium">{vehicle.plateNumber}</span>
      </SaleDetailElement>
      <SaleDetailElement className="mt-2" label="Mileage">
        {vehicle.mileage}
      </SaleDetailElement>
      <SaleDetailElement className="mt-2" label="VIN N.O">
        {vehicle.vinNo}
      </SaleDetailElement>
      <SaleDetailElement className="mt-2" label="Engine N.O">
        {vehicle.engineNo}
      </SaleDetailElement>
      <SaleDetailElement className="mt-2" label="Vehicle Note">
        <Textarea className="mt-2">
          {vehicle.note}
        </Textarea>
      </SaleDetailElement>
    </div>
  );
}