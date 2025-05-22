import { cn } from "@/lib/utils";
import { InvoiceDetailElement } from "./invoice-detail-element";
import { VehicleDto } from "@/features/vehicle/types/vehicle.dto";

export function VehicleInfo({ vehicle, className }: { vehicle: VehicleDto, className?: string }) {
  return (
    <div className={cn([
      "items-center grid grid-cols-[auto,1fr]",
      className
    ])}>
      <h3 className="font-bold text-lg">Vehicle</h3>
      <div className="justify-items-center items-center gap-4 grid grid-cols-6">
        <InvoiceDetailElement className="col-span-2" label="Make and Model">
          <span className="font-semibold">{vehicle.makeAndModel}</span>
        </InvoiceDetailElement>
        <InvoiceDetailElement label="Plate Number">
          <span className="font-semibold">{vehicle.plateNumber}</span>
        </InvoiceDetailElement>
        <InvoiceDetailElement label="Mileage">
          {vehicle.mileage} k.m
        </InvoiceDetailElement>
        <InvoiceDetailElement label="Vin N.O">
          {vehicle.vinNo || '-'}
        </InvoiceDetailElement>
      </div>
    </div>
  );
}