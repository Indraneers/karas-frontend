import { SaleDetailElement } from "./sale-detail-element";
import { cn } from "@/lib/utils";
import { TypographyH2 } from "@/components/ui/typography/h2";
import { VehicleDto } from "@/features/vehicle/types/vehicle.dto";

export function VehicleInformation({ vehicle, className } : { vehicle: VehicleDto, className?: string }) {
  return (
    <div className={cn([
      className
    ])}>
      <TypographyH2>
          Vehicle Detail
      </TypographyH2>
      <SaleDetailElement className="mt-2" label="Make & Model">
        <span className="font-medium">{vehicle.makeAndModel}</span>
      </SaleDetailElement>
      <div className="gap-2 grid grid-cols-2 grid-rows-2 mt-2">
        <SaleDetailElement label="Plate Number">
          <span className="font-medium">{vehicle.plateNumber}</span>
        </SaleDetailElement>
        <SaleDetailElement className="ml-4" label="Mileage">
          {vehicle.mileage}
        </SaleDetailElement>
        <SaleDetailElement label="VIN N.O">
          {vehicle.vinNo}
        </SaleDetailElement>
        <SaleDetailElement className="ml-4" label="Engine N.O">
          {vehicle.engineNo}
        </SaleDetailElement>
      </div>
      <SaleDetailElement className="mt-2" label="Vehicle Note">
        {vehicle.note}
      </SaleDetailElement>
    </div>
  );
}